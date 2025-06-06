
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { useCartPersistence } from "@/hooks/useCartPersistence";
import { useFavorites } from "@/hooks/useFavorites";
import EnhancedReviewForm from "@/components/custom/reviews/EnhancedReviewForm";
import EnhancedReviewsList from "@/components/custom/reviews/EnhancedReviewsList";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
  is_featured: boolean;
}

const DishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dish, setDish] = useState<Dish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const { addToCart } = useCartPersistence();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (id) {
      fetchDish();
    }
  }, [id]);

  const fetchDish = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setDish(data);
    } catch (error: any) {
      console.error('Error fetching dish:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les détails du plat"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!dish) return;

    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image_url: dish.image_url,
      quantity: 1
    });

    toast({
      title: "Ajouté au panier",
      description: `${dish.name} a été ajouté à votre panier`
    });
  };

  const handleToggleFavorite = () => {
    if (!dish) return;
    toggleFavorite(dish);
  };

  const handleReviewSuccess = () => {
    setRefreshReviews(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Plat non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src={dish.image_url || '/placeholder.svg'}
            alt={dish.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{dish.name}</h1>
              {dish.is_featured && (
                <Badge className="bg-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Vedette
                </Badge>
              )}
            </div>
            
            <Badge variant="outline" className="mb-4">
              {dish.category}
            </Badge>
            
            <p className="text-gray-600 text-lg mb-4">
              {dish.description}
            </p>
            
            <p className="text-3xl font-bold text-primary mb-6">
              {dish.price.toFixed(2)}€
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={!dish.is_available}
              className="flex-1 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              {dish.is_available ? 'Ajouter au panier' : 'Non disponible'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              className="flex items-center gap-2"
            >
              <Heart 
                size={20} 
                className={isFavorite(dish.id) ? 'fill-red-500 text-red-500' : ''} 
              />
              {isFavorite(dish.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </Button>
          </div>

          {!dish.is_available && (
            <p className="text-red-600 font-medium">
              Ce plat n'est actuellement pas disponible
            </p>
          )}
        </div>
      </div>

      {/* Section des avis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Laisser un avis</h2>
          <EnhancedReviewForm dishId={dish.id} onSuccess={handleReviewSuccess} />
        </div>
        
        <div>
          <EnhancedReviewsList dishId={dish.id} refreshTrigger={refreshReviews} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
