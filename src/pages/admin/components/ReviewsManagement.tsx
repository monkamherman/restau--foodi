
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, Check, X, Clock } from "lucide-react";
import { useAuth } from "@/hooks/auth";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface Review {
  id: string;
  user_id: string;
  dish_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  is_approved: boolean;
  approved_by: string | null;
  approved_at: string | null;
  profile?: Profile;
}

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedReviews: Review[] = data.map(review => {
        const profileData = review.profiles as unknown;
        let profile: Profile | undefined = undefined;
        
        if (profileData && typeof profileData === 'object' &&
            'id' in profileData &&
            'first_name' in profileData &&
            'last_name' in profileData &&
            'avatar_url' in profileData) {
          profile = profileData as Profile;
        }
        
        return {
          ...review,
          is_approved: review.is_approved || false,
          approved_by: review.approved_by || null,
          approved_at: review.approved_at || null,
          profile
        };
      });

      setReviews(formattedReviews);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des avis",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({
          is_approved: true,
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, is_approved: true, approved_by: user?.id, approved_at: new Date().toISOString() }
          : review
      ));

      toast({
        title: "Avis approuvé",
        description: "L'avis est maintenant visible publiquement",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'approbation",
        description: error.message,
      });
    }
  };

  const handleRejectReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.filter(review => review.id !== reviewId));

      toast({
        title: "Avis rejeté",
        description: "L'avis a été supprimé",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du rejet",
        description: error.message,
      });
    }
  };

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ));
  };

  const getStatusBadge = (review: Review) => {
    if (review.is_approved) {
      return <Badge variant="default" className="bg-green-100 text-green-800"><Check size={12} className="mr-1" />Approuvé</Badge>;
    }
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock size={12} className="mr-1" />En attente</Badge>;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Avis Clients</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tous les Avis</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">Chargement des avis...</div>
          ) : reviews.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">Aucun avis pour le moment</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      {review.profile ? (
                        `${review.profile.first_name || ''} ${review.profile.last_name || ''}`.trim() || 'Anonyme'
                      ) : (
                        'Anonyme'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {renderRatingStars(review.rating)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate">
                        {review.comment || 'Pas de commentaire'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(review.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(review)}
                    </TableCell>
                    <TableCell>
                      {!review.is_approved ? (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveReview(review.id)}
                          >
                            <Check size={16} className="mr-1" /> Approuver
                          </Button>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectReview(review.id)}
                          >
                            <X size={16} className="mr-1" /> Rejeter
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectReview(review.id)}
                        >
                          <X size={16} className="mr-1" /> Supprimer
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsManagement;
