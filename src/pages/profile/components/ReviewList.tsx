
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

interface Review {
  id: string;
  dish_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  dish: {
    name: string;
    image_url: string | null;
  };
}

interface ReviewListProps {
  userId?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const ReviewList = ({ userId }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      fetchUserReviews();
    }
  }, [userId]);

  const fetchUserReviews = async () => {
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
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setReviews(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading reviews",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Star size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">No reviews yet</p>
            <p className="text-muted-foreground">You haven't left any reviews on dishes yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
                  {review.dish?.image_url ? (
                    <img 
                      src={review.dish.image_url} 
                      alt={review.dish?.name || "Dish"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Star size={24} className="opacity-20" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{review.dish?.name || "Unknown dish"}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewList;
