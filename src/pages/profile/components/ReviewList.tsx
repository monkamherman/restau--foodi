
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Review = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  dish_id: string;
  dish_name?: string;
};

const ReviewList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dishes, setDishes] = useState<Record<string, { name: string; image_url: string | null }>>({});

  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user]);

  const fetchUserReviews = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user's reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user?.id);
        
      if (reviewsError) throw reviewsError;
      
      // Fetch all dishes to get their names
      const { data: dishesData, error: dishesError } = await supabase
        .from("dishes")
        .select("id, name, image_url");
        
      if (dishesError) throw dishesError;
      
      // Create a lookup object for dishes
      const dishesLookup: Record<string, { name: string; image_url: string | null }> = {};
      dishesData.forEach((dish) => {
        dishesLookup[dish.id] = { name: dish.name, image_url: dish.image_url };
      });
      
      setDishes(dishesLookup);
      setReviews(reviewsData);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement des avis",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);
        
      if (error) throw error;
      
      // Remove the deleted review from state
      setReviews(reviews.filter(review => review.id !== reviewId));
      
      toast({
        title: "Avis supprimé",
        description: "Votre avis a été supprimé avec succès"
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la suppression",
        description: error.message
      });
    }
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes avis</CardTitle>
        <CardDescription>Les avis que vous avez laissés sur nos plats</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Vous n'avez pas encore laissé d'avis</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {dishes[review.dish_id]?.name || "Plat inconnu"}
                    </h3>
                    <div className="flex mt-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewList;
