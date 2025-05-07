
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/auth";
import { AlertCircle } from "lucide-react";

type FeedbackFormProps = {
  onSubmitSuccess?: () => void;
};

const FeedbackForm = ({ onSubmitSuccess }: FeedbackFormProps) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Connexion requise",
        description: "Vous devez être connecté pour laisser un avis."
      });
      return;
    }
    
    if (!message) {
      toast({
        variant: "destructive",
        title: "Message obligatoire",
        description: "Veuillez écrire votre avis avant de l'envoyer."
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("reviews")
        .insert({
          comment: message,
          rating: rating,
          user_id: user.id,
          // Pas besoin de dish_id car c'est un feedback général
        });
        
      if (error) throw error;
      
      toast({
        title: "Merci pour votre avis !",
        description: "Nous avons bien reçu votre message."
      });
      
      // Réinitialiser le formulaire
      setMessage("");
      setRating(5);
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'envoi",
        description: error.message || "Une erreur est survenue, veuillez réessayer plus tard."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Connexion requise</h3>
        <p className="text-muted-foreground mb-4">
          Vous devez être connecté pour laisser un avis. Connectez-vous pour partager votre expérience.
        </p>
        <Button asChild variant="outline">
          <a href="/login">Se connecter</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium mb-2">
          Note (1-5)
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? "text-foodie-rating" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Votre Avis
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Partagez votre expérience ou suggestions..."
          rows={5}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
      </Button>
    </form>
  );
};

export default FeedbackForm;
