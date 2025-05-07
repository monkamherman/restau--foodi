
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Mail, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  user_id: string;
  profiles?: Profile | null;
}

type EmailFormValues = {
  subject: string;
  message: string;
};

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EmailFormValues>({
    defaultValues: {
      subject: "Réponse à votre avis - Restaurant Camerounais",
      message: "",
    },
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Process the data to handle potential issues with profiles
      const formattedReviews: Review[] = data ? data.map(item => {
        const review: Review = {
          id: item.id,
          rating: item.rating,
          comment: item.comment,
          created_at: item.created_at,
          user_id: item.user_id,
          profiles: item.profiles as Profile | null
        };
        return review;
      }) : [];
      
      setReviews(formattedReviews);
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les avis"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEmailDialog = (review: Review) => {
    setSelectedReview(review);
    
    // Préparation du message par défaut
    form.setValue("message", `
Cher(e) Client(e),

Nous vous remercions pour votre avis sur notre restaurant.

${review.comment ? `Concernant votre commentaire: "${review.comment}"` : ""}

Nous sommes ravis d'avoir pu vous accueillir dans notre établissement et serions heureux de vous recevoir à nouveau.

Cordialement,
L'équipe du Restaurant Camerounais
    `.trim());
    
    setDialogOpen(true);
  };

  const handleSendEmail = async (values: EmailFormValues) => {
    if (!selectedReview) return;
    
    try {
      setIsSending(true);
      
      // Ici, nous simulons l'envoi d'un email
      // Dans un cas réel, cela serait connecté à une fonction edge Supabase pour envoyer l'email
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email envoyé avec succès",
        description: "Votre réponse a été envoyée au client."
      });
      
      setDialogOpen(false);
      form.reset();
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: error.message || "Impossible d'envoyer l'email"
      });
    } finally {
      setIsSending(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
        />
      ));
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Avis Clients</h2>
        <Button onClick={() => fetchReviews()}>Rafraîchir</Button>
      </div>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-lg">Aucun avis client pour le moment</p>
        </div>
      ) : (
        <Table>
          <TableCaption>Liste de tous les avis clients</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  {review.profiles?.first_name || "Anonyme"} {review.profiles?.last_name || ""}
                </TableCell>
                <TableCell>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {review.comment || "Aucun commentaire"}
                </TableCell>
                <TableCell>
                  {new Date(review.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenEmailDialog(review)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Répondre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Répondre au client</DialogTitle>
            <DialogDescription>
              Envoyez un email en réponse à l'avis du client {selectedReview?.profiles?.first_name || "anonyme"}.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendEmail)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sujet</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSending}
                >
                  {isSending ? "Envoi..." : "Envoyer l'email"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsManagement;
