
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("food");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Évaluation requise",
        description: "Veuillez sélectionner une note avant de soumettre",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const feedbackData = {
        rating,
        name: user ? undefined : name,
        email: user ? undefined : email,
        comment: comment.trim() || null,
        category,
        user_id: user?.id || null
      };
      
      // Enregistrement de l'avis dans Supabase
      const { error } = await supabase
        .from('feedback')
        .insert(feedbackData);
      
      if (error) throw error;
      
      toast({
        title: "Avis envoyé",
        description: "Merci pour votre feedback !"
      });
      
      // Réinitialisation du formulaire
      setRating(0);
      setName("");
      setEmail("");
      setComment("");
      setCategory("food");
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer votre avis pour le moment. Veuillez réessayer plus tard.",
        variant: "destructive"
      });
      console.error("Feedback submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Votre Avis Nous Intéresse</CardTitle>
        <CardDescription>
          Partagez votre expérience avec nous pour nous aider à améliorer nos services
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label className="block mb-2">Votre Note</Label>
            <div className="flex items-center gap-2">
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
                    size={32}
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
          
          {/* Category */}
          <div>
            <Label htmlFor="category" className="block mb-2">Catégorie</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="food">Nourriture</option>
              <option value="service">Service</option>
              <option value="ambiance">Ambiance</option>
              <option value="cleanliness">Propreté</option>
              <option value="other">Autre</option>
            </select>
          </div>
          
          {/* Name & Email (for non-authenticated users) */}
          {!user && (
            <>
              <div>
                <Label htmlFor="name" className="block mb-2">Votre Nom</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block mb-2">Votre Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          
          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="block mb-2">Votre Commentaire</Label>
            <Textarea
              id="comment"
              placeholder="Partagez votre expérience avec nous..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={isSubmitting || rating === 0 || (!user && (name === "" || email === ""))}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer votre avis"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackForm;
