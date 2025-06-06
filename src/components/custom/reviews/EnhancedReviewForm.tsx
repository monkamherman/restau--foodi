
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedReviewFormProps {
  dishId: string;
  onSuccess?: () => void;
}

const EnhancedReviewForm = ({ dishId, onSuccess }: EnhancedReviewFormProps) => {
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
        title: "Authentification requise",
        description: "Vous devez être connecté pour laisser un avis",
        variant: "destructive"
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Note requise",
        description: "Veuillez sélectionner une note avant de soumettre",
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
          comment: comment.trim() || null,
          is_approved: false
        });
      
      if (error) throw error;
      
      toast({
        title: "Avis soumis",
        description: "Votre avis a été soumis et sera visible après validation"
      });
      
      setRating(0);
      setComment("");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Erreur lors de la soumission",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Laisser un Avis</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Votre Note</p>
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
              {rating > 0 ? `${rating} sur 5` : "Sélectionnez une note"}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="text-sm font-medium block mb-2">
            Votre Commentaire (Optionnel)
          </label>
          <Textarea
            id="comment"
            placeholder="Partagez votre expérience avec ce plat..."
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
          {isSubmitting ? "Envoi en cours..." : "Soumettre l'Avis"}
        </Button>
        
        {!user && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Veuillez vous connecter pour laisser un avis.
          </p>
        )}
      </form>
    </div>
  );
};

export default EnhancedReviewForm;
