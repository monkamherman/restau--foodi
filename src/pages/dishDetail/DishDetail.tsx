
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Minus, Plus, Star, Clock, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const DishDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [dish, setDish] = useState<Dish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (slug) {
      fetchDishBySlug(slug);
    }
  }, [slug]);
  
  const fetchDishBySlug = async (dishSlug: string) => {
    try {
      setIsLoading(true);
      
      // Décoder le slug: nom-category-origin devient recherche par nom
      const dishName = dishSlug.split('-')[0].replace(/%20/g, ' ');
      
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .ilike('name', `%${dishName}%`)
        .single();
      
      if (error) throw error;
      
      setDish(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement du plat",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };
  
  const addToCart = () => {
    if (!dish) return;
    console.log(`Added ${quantity} of ${dish.name} to cart`);
    toast({
      title: "Ajouté au panier",
      description: `${quantity} × ${dish.name} ajouté à votre panier`
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isFavorite ? `${dish?.name} retiré de vos favoris` : `${dish?.name} ajouté à vos favoris`
    });
  };

  const handleReviewSuccess = () => {
    setRefreshReviews(prev => prev + 1);
  };

  const tabItems = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Avis" }
  ];

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 flex justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!dish) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Plat introuvable</h2>
        <p className="text-foodie-text-light">Le plat que vous recherchez n'existe pas.</p>
      </div>
    );
  }
  
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image section */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={dish.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"} 
              alt={dish.name} 
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Details section */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="bg-foodie-primary/10 text-foodie-primary text-sm px-3 py-1 rounded-full">
                {dish.category}
              </span>
              <button 
                onClick={toggleFavorite}
                className={cn(
                  "w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-colors",
                  isFavorite ? "text-red-500" : "hover:text-foodie-primary"
                )}
              >
                <Heart size={20} className={isFavorite ? "fill-current" : ""} />
              </button>
            </div>
            
            <h1 className="text-3xl font-bold mb-3">{dish.name}</h1>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-foodie-primary">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(dish.price)}
              </span>
              {dish.is_featured && (
                <span className="ml-4 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Coup de cœur
                </span>
              )}
            </div>
            
            {dish.description && (
              <p className="text-foodie-text-light mb-6">{dish.description}</p>
            )}
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => updateQuantity(-1)} 
                  className="w-10 h-10 flex items-center justify-center hover:text-foodie-primary border-r"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => updateQuantity(1)} 
                  className="w-10 h-10 flex items-center justify-center hover:text-foodie-primary border-l"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={addToCart} 
                className="flex-grow bg-foodie-primary text-white py-3 rounded-lg font-medium flex items-center justify-center hover:bg-foodie-primary-dark transition-all"
                disabled={!dish.is_available}
              >
                <ShoppingCart size={18} className="mr-2" />
                {dish.is_available ? "Ajouter au panier" : "Non disponible"}
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "py-3 px-6 font-medium",
                      activeTab === tab.id 
                        ? "text-foodie-primary border-b-2 border-foodie-primary" 
                        : "text-foodie-text-light hover:text-foodie-text"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="py-6">
              {activeTab === "description" && (
                <p className="text-foodie-text-light">{dish.description || "Aucune description disponible pour ce plat."}</p>
              )}
              
              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <ReviewsList dishId={dish.id} refreshTrigger={refreshReviews} />
                  <ReviewForm dishId={dish.id} onSuccess={handleReviewSuccess} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
