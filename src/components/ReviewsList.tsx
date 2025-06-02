
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  is_approved: boolean;
  user_id: string;
  profiles?: Profile | null;
}

interface ReviewsListProps {
  dishId: string;
  refreshTrigger?: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300",
            "mr-0.5"
          )}
        />
      ))}
    </div>
  );
};

const ReviewsList = ({ dishId, refreshTrigger = 0 }: ReviewsListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0]
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [dishId, refreshTrigger, user]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      // Fetch all approved reviews or the user's own reviews
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id(
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('dish_id', dishId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Process the data to handle potential issues with profiles
      const formattedReviews: Review[] = data ? data.map(item => {
        const profileData = item.profiles as unknown;
        let profile: Profile | null = null;
        
        if (profileData && typeof profileData === 'object' && 
            'first_name' in profileData && 
            'last_name' in profileData && 
            'avatar_url' in profileData) {
          profile = profileData as Profile;
        }
        
        return {
          id: item.id,
          rating: item.rating,
          comment: item.comment,
          created_at: item.created_at,
          is_approved: item.is_approved,
          user_id: item.user_id,
          profiles: profile
        };
      }) : [];
      
      // Separate user's pending reviews and approved reviews
      const approved = formattedReviews.filter(review => review.is_approved);
      const pending = user ? formattedReviews.filter(review => !review.is_approved && review.user_id === user.id) : [];
      
      setReviews(approved);
      setPendingReviews(pending);
      
      // Calculate stats based on approved reviews only
      if (approved.length > 0) {
        const total = approved.length;
        const sum = approved.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / total;
        
        // Count ratings distribution
        const distribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
        approved.forEach(review => {
          distribution[5 - review.rating] += 1;
        });
        
        setStats({
          average,
          total,
          distribution
        });
      } else {
        setStats({
          average: 0,
          total: 0,
          distribution: [0, 0, 0, 0, 0]
        });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      {/* User's pending reviews */}
      {pendingReviews.length > 0 && (
        <div className="mb-8">
          <Alert variant="warning">
            <AlertTitle>Vos avis en attente d'approbation</AlertTitle>
            <AlertDescription>
              Vos avis ci-dessous sont en cours de modération et seront visibles par tous une fois approuvés.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 space-y-4">
            {pendingReviews.map(review => (
              <div key={review.id} className="border-l-4 border-yellow-400 pl-4 py-3 bg-yellow-50 rounded">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-muted-foreground">En attente d'approbation</span>
                </div>
                {review.comment && (
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review stats summary */}
      {reviews.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.average.toFixed(1)}</div>
              <StarRating rating={Math.round(stats.average)} />
              <p className="text-sm text-muted-foreground mt-1">{stats.total} avis</p>
            </div>
            
            <div className="flex-1">
              {stats.distribution.map((count, index) => {
                const stars = 5 - index;
                const percentage = stats.total ? (count / stats.total) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center gap-2 mb-1">
                    <div className="text-sm w-8">{stars} ★</div>
                    <div className="flex-1 bg-gray-100 h-2 rounded-full">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground w-8">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Review list */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <Star size={40} className="mx-auto opacity-20 mb-4" />
          <p className="text-lg font-medium">Aucun Avis Pour le Moment</p>
          <p className="text-muted-foreground">Soyez le premier à donner votre avis sur ce plat !</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex gap-4">
                <Avatar>
                  {review.profiles?.avatar_url ? (
                    <AvatarImage src={review.profiles.avatar_url} alt="User" />
                  ) : (
                    <AvatarFallback>
                      {review.profiles?.first_name?.[0] || '?'}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {review.profiles?.first_name || "Anonyme"}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mt-1 mb-2">
                    <StarRating rating={review.rating} />
                  </div>
                  
                  {review.comment && <p className="text-muted-foreground">{review.comment}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
