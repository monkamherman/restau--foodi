
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/auth";
import EmptyState from "./EmptyState";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  dish_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  dish: {
    name: string;
    image_url: string | null;
  } | null;
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

const ReviewsTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user]);
  
  const fetchUserReviews = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          dish:dish_id (
            name,
            image_url
          )
        `)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load your reviews"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={Star}
        title="Your Reviews"
        description="You haven't left any reviews yet."
        linkText="Browse Menu"
        linkUrl="/menu"
      />
    );
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Reviews</h2>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex gap-4">
              {review.dish?.image_url ? (
                <Avatar className="w-16 h-16 rounded-md">
                  <AvatarImage src={review.dish.image_url} alt={review.dish?.name || 'Dish'} className="object-cover" />
                  <AvatarFallback className="rounded-md">
                    {review.dish?.name?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md">
                  <Star className="text-muted-foreground" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{review.dish?.name || 'Unknown Dish'}</h4>
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
    </Card>
  );
};

export default ReviewsTab;
