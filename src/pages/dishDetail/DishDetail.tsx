
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Minus, Plus, Star, Clock, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ReviewsList from "@/components/ReviewsList";
import ReviewForm from "@/components/ReviewForm";

const DishDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [dish, setDish] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      fetchDish(id);
    }
  }, [id]);
  
  const fetchDish = async (dishId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', dishId)
        .single();
      
      if (error) throw error;
      
      setDish(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading dish",
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
    console.log(`Added ${quantity} of ${dish.name} to cart`);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${dish.name} added to your cart`
    });
  };

  const handleReviewSuccess = () => {
    setRefreshReviews(prev => prev + 1);
  };

  const tabItems = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" }
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
        <h2 className="text-2xl font-bold mb-4">Dish Not Found</h2>
        <p className="text-foodie-text-light">The dish you're looking for does not exist.</p>
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
              <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:text-foodie-primary transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            <h1 className="text-3xl font-bold mb-3">{dish.name}</h1>
            
            <div className="flex items-center mb-6">
              {/* Price will be here */}
              <span className="text-2xl font-bold text-foodie-primary">${dish.price.toFixed(2)}</span>
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
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
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
                <p className="text-foodie-text-light">{dish.description || "No description available for this dish."}</p>
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
