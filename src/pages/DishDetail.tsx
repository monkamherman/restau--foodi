
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, ShoppingCart, Star, MinusCircle, PlusCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Sample dishes data (in a real app, this would come from a database)
const dishes = [
  {
    id: "1",
    name: "Fettucini Salad",
    description: "A delicious pasta salad made with fresh vegetables, feta cheese, and our homemade dressing. Perfect for a light lunch or as a side dish.",
    price: 24.00,
    rating: 4.9,
    reviews: 86,
    category: "Main Dish",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    cookTime: "25 mins",
    ingredients: ["Fresh pasta", "Cherry tomatoes", "Cucumber", "Red onion", "Feta cheese", "Olives", "Fresh basil", "Italian dressing"]
  },
  {
    id: "2",
    name: "Vegetable Salad",
    description: "A nutritious mix of seasonal vegetables, nuts, and seeds, tossed in our signature herb vinaigrette. A perfect healthy choice.",
    price: 20.00,
    rating: 4.8,
    reviews: 47,
    category: "Break Fast",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    cookTime: "15 mins",
    ingredients: ["Mixed greens", "Bell peppers", "Carrot", "Avocado", "Sunflower seeds", "Pumpkin seeds", "Cherry tomatoes", "Herb vinaigrette"]
  },
  {
    id: "3",
    name: "Egg Fried Rice",
    description: "Traditional Asian style fried rice with scrambled eggs, vegetables, and our special sauce. A comforting and satisfying meal.",
    price: 22.00,
    rating: 4.9,
    reviews: 53,
    category: "Main Dish",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    cookTime: "20 mins",
    ingredients: ["Jasmine rice", "Eggs", "Carrots", "Peas", "Green onions", "Soy sauce", "Sesame oil", "Garlic"]
  }
];

const DishDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  
  // Find the dish with the matching id
  const dish = dishes.find(dish => dish.id === id);
  
  // Handle case where dish is not found
  if (!dish) {
    return (
      <>
        <Header />
        <div className="pt-20 pb-16 container-custom">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Dish Not Found</h1>
            <p className="mb-8">Sorry, the dish you're looking for doesn't exist.</p>
            <Link to="/menu" className="btn-primary">
              Back to Menu
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${dish.name} added to your cart`,
      duration: 3000,
    });
  };
  
  const toggleFavorite = () => {
    setFavorite(!favorite);
    toast({
      title: favorite ? "Removed from favorites" : "Added to favorites",
      description: favorite ? `${dish.name} removed from your favorites` : `${dish.name} added to your favorites`,
      duration: 3000,
    });
  };

  // Find related dishes (same category, excluding current dish)
  const relatedDishes = dishes
    .filter(item => item.category === dish.category && item.id !== dish.id)
    .slice(0, 2); // Limit to 2 related dishes
  
  return (
    <>
      <Header />
      <div className="pt-20 pb-16">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Dish Image */}
            <div>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-[400px] object-cover" 
                />
              </div>
            </div>
            
            {/* Dish Details */}
            <div>
              <div className="mb-2">
                <span className="text-foodie-primary text-sm font-medium">
                  {dish.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <Star className="text-foodie-rating fill-foodie-rating" size={16} />
                  <span className="ml-1 font-medium">{dish.rating}</span>
                  <span className="ml-1 text-foodie-text-light text-sm">
                    ({dish.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="text-foodie-text-light" />
                  <span className="ml-1 text-sm text-foodie-text-light">
                    {dish.cookTime}
                  </span>
                </div>
              </div>
              
              <p className="text-foodie-text-light mb-6">
                {dish.description}
              </p>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Ingredients:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-foodie-text-light">
                      <span className="w-1.5 h-1.5 bg-foodie-primary rounded-full mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-bold text-foodie-primary">
                  ${dish.price.toFixed(2)}
                </div>
                
                <div className="flex items-center border rounded-full">
                  <button 
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => updateQuantity(quantity - 1)}
                  >
                    <MinusCircle size={20} />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => updateQuantity(quantity + 1)}
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button 
                  className="flex-1 bg-foodie-primary hover:bg-foodie-primary-dark flex items-center justify-center gap-2 py-6"
                  onClick={addToCart}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline"
                  className={`w-12 h-12 rounded-full p-0 ${
                    favorite
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-foodie-text-light text-foodie-text-light"
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart size={20} className={favorite ? "fill-current" : ""} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Dishes */}
          {relatedDishes.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDishes.map((relatedDish) => (
                  <Link 
                    key={relatedDish.id} 
                    to={`/dish/${relatedDish.id}`}
                    className="dish-card"
                  >
                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={relatedDish.image} 
                        alt={relatedDish.name} 
                        className="w-full h-60 object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{relatedDish.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-foodie-primary">${relatedDish.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-foodie-rating">★</span>
                        <span className="ml-1 mr-1">{relatedDish.rating}</span>
                        <span className="text-foodie-text-light text-sm">({relatedDish.reviews})</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DishDetail;
