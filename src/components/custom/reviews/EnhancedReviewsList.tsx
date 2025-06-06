
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, User, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Review {
  id: string;
  comment: string | null;
  rating: number;
  created_at: string;
  user_id: string;
  dish_id: string;
  is_approved: boolean;
  admin_response: string | null;
  helpful_count: number;
  total_votes: number;
}

interface ReviewVote {
  id: string;
  user_id: string;
  review_id: string;
  is_helpful: boolean;
}

interface EnhancedReviewsListProps {
  dishId?: string;
  refreshTrigger?: number;
}

const EnhancedReviewsList = ({ dishId, refreshTrigger }: EnhancedReviewsListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
    if (user) {
      fetchUserVotes();
    }
  }, [dishId, refreshTrigger, user]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (dishId) {
        query = query.eq('dish_id', dishId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des avis",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserVotes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('review_votes')
        .select('review_id, is_helpful')
        .eq('user_id', user.id);

      if (error) throw error;

      const votesMap: Record<string, boolean> = {};
      data?.forEach(vote => {
        votesMap[vote.review_id] = vote.is_helpful;
      });
      setUserVotes(votesMap);
    } catch (error: any) {
      console.error('Error fetching user votes:', error);
    }
  };

  const handleVote = async (reviewId: string, isHelpful: boolean) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour voter",
        variant: "destructive"
      });
      return;
    }

    try {
      const existingVote = userVotes[reviewId];
      
      if (existingVote !== undefined) {
        // Mettre à jour le vote existant
        const { error } = await supabase
          .from('review_votes')
          .update({ is_helpful: isHelpful })
          .eq('user_id', user.id)
          .eq('review_id', reviewId);

        if (error) throw error;
      } else {
        // Créer un nouveau vote
        const { error } = await supabase
          .from('review_votes')
          .insert({
            user_id: user.id,
            review_id: reviewId,
            is_helpful: isHelpful
          });

        if (error) throw error;
      }

      // Mettre à jour les compteurs
      const review = reviews.find(r => r.id === reviewId);
      if (review) {
        let newHelpfulCount = review.helpful_count;
        
        if (existingVote === undefined) {
          // Nouveau vote
          if (isHelpful) newHelpfulCount += 1;
        } else if (existingVote !== isHelpful) {
          // Changement de vote
          if (isHelpful) {
            newHelpfulCount += 1;
          } else {
            newHelpfulCount -= 1;
          }
        }

        const { error: updateError } = await supabase
          .from('reviews')
          .update({ helpful_count: newHelpfulCount })
          .eq('id', reviewId);

        if (updateError) throw updateError;
      }

      // Mettre à jour l'état local
      setUserVotes(prev => ({ ...prev, [reviewId]: isHelpful }));
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful_count: review.helpful_count + (userVotes[reviewId] === undefined ? (isHelpful ? 1 : 0) : (isHelpful && !userVotes[reviewId] ? 1 : !isHelpful && userVotes[reviewId] ? -1 : 0)) }
          : review
      ));

      toast({
        title: "Vote enregistré",
        description: "Merci pour votre feedback!"
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du vote",
        description: error.message
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4">Chargement des avis...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Aucun avis pour le moment. Soyez le premier à laisser un avis!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Avis clients ({reviews.length})</h3>
      
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Utilisateur</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="outline">Vérifié</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {review.comment && (
              <p className="text-gray-700 mb-4">{review.comment}</p>
            )}
            
            {review.admin_response && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <div className="flex items-center mb-2">
                  <MessageSquare size={16} className="text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Réponse du restaurant</span>
                </div>
                <p className="text-blue-700">{review.admin_response}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center space-x-4">
                <Button
                  variant={userVotes[review.id] === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVote(review.id, true)}
                  className="flex items-center space-x-1"
                >
                  <ThumbsUp size={14} />
                  <span>Utile ({review.helpful_count})</span>
                </Button>
                
                <Button
                  variant={userVotes[review.id] === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVote(review.id, false)}
                  className="flex items-center space-x-1"
                >
                  <ThumbsDown size={14} />
                  <span>Pas utile</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EnhancedReviewsList;
