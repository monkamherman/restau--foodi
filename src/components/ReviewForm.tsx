
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  dishId: string;
  onSuccess?: () => void;
}

const ReviewForm = ({ dishId, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to submit a review",
        variant: "destructive"
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          dish_id: dishId,
          user_id: user.id,
          rating,
          comment: comment.trim() || null
        });
      
      if (error) throw error;
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!"
      });
      
      setRating(0);
      setComment("");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error submitting review",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Your Rating</p>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                className="p-1 focus:outline-none"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={24}
                  className={cn(
                    "transition-colors",
                    (hoverRating || rating) >= i
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 ? `${rating} out of 5` : "Select a rating"}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="text-sm font-medium block mb-2">
            Your Review (Optional)
          </label>
          <Textarea
            id="comment"
            placeholder="Tell us your thoughts about this dish..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={!user || rating === 0 || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        
        {!user && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Please log in to submit a review.
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
