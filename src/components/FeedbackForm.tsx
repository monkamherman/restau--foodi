
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FeedbackFormProps = {
  onSubmitSuccess?: () => void;
};

const FeedbackForm = ({ onSubmitSuccess }: FeedbackFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        variant: "destructive",
        title: "Champs obligatoires",
        description: "Veuillez remplir tous les champs du formulaire."
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Utiliser la table reviews qui existe déjà dans la base de données
      // au lieu de feedback qui n'existe pas
      const { error } = await supabase
        .from("reviews")
        .insert({
          comment: message,
          rating: rating,
          // Pas besoin d'user_id ou dish_id car c'est juste un feedback général
        });
        
      if (error) throw error;
      
      toast({
        title: "Merci pour votre avis !",
        description: "Nous avons bien reçu votre message."
      });
      
      // Réinitialiser le formulaire
      setName("");
      setEmail("");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Votre Nom
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
          />
        </div>
      </div>
      
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
          Votre Message
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
