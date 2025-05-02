
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Minus, Plus, Star, Clock, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const dishes = [
  {
    id: "1",
    name: "Fettucini Salad",
    description: "A delicious pasta salad made with fresh fettucini, cherry tomatoes, olives, feta cheese, and a zesty lemon herb dressing. Perfect as a side dish or light main course.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 24.00,
    rating: 4.9,
    reviews: 86,
    category: "Pasta",
    prepTime: "25 min",
    calories: 420,
    tags: ["Vegetarian", "Italian", "Pasta"],
    ingredients: [
      "Fresh fettucini pasta", "Cherry tomatoes", "Kalamata olives", "Feta cheese", "Red onion", 
      "Fresh basil", "Extra virgin olive oil", "Lemon juice", "Garlic", "Salt and pepper"
    ]
  },
  {
    id: "2",
    name: "Vegetable Salad",
    description: "A colorful and nutritious vegetable salad packed with fresh produce, seeds, and a honey-mustard vinaigrette. This salad is not only beautiful but also full of vitamins and antioxidants.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 20.00,
    rating: 4.8,
    reviews: 47,
    category: "Salads",
    prepTime: "15 min",
    calories: 320,
    tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    ingredients: [
      "Mixed greens", "Bell peppers", "Cucumber", "Cherry tomatoes", "Avocado", 
      "Pumpkin seeds", "Sunflower seeds", "Red onion", "Honey", "Dijon mustard", "Apple cider vinegar"
    ]
  },
  {
    id: "3",
    name: "Egg Fried Rice",
    description: "A classic Asian comfort food made with fluffy rice, scrambled eggs, vegetables, and savory soy sauce. This quick and satisfying dish is perfect for lunch or dinner.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    price: 22.00,
    rating: 4.9,
    reviews: 53,
    category: "Asian",
    prepTime: "20 min",
    calories: 480,
    tags: ["Asian", "Rice", "Quick Meal"],
    ingredients: [
      "Jasmine rice", "Eggs", "Carrots", "Peas", "Green onions", 
      "Soy sauce", "Sesame oil", "Garlic", "Ginger", "Vegetable oil"
    ]
  }
];

const DishDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  // Find the dish by id
  const dish = dishes.find(dish => dish.id === id);
  
  if (!dish) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Dish Not Found</h2>
        <p className="text-foodie-text-light">The dish you're looking for does not exist.</p>
      </div>
    );
  }
  
  const updateQuantity = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };
  
  const addToCart = () => {
    console.log(`Added ${quantity} of ${dish.name} to cart`);
    // In a real app, this would dispatch to a cart context or state manager
  };

  const tabItems = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "reviews", label: `Reviews (${dish.reviews})` }
  ];

  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image section */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={dish.image} 
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
              <div className="flex items-center text-foodie-rating">
                <Star size={18} fill="#FFC107" />
                <span className="ml-1 font-medium">{dish.rating}</span>
              </div>
              <span className="text-foodie-text-light text-sm mx-2">
                ({dish.reviews} reviews)
              </span>
              <div className="flex items-center ml-4">
                <Clock size={18} className="text-foodie-text-light" />
                <span className="ml-1 text-foodie-text-light">{dish.prepTime}</span>
              </div>
              <div className="flex items-center ml-4">
                <span className="text-foodie-text-light">{dish.calories} cal</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {dish.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-foodie-text-light text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center mb-8">
              <span className="text-2xl font-bold text-foodie-primary">${dish.price.toFixed(2)}</span>
            </div>
            
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
                <p className="text-foodie-text-light">{dish.description}</p>
              )}
              
              {activeTab === "ingredients" && (
                <ul className="list-disc pl-5 space-y-2 text-foodie-text-light">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              
              {activeTab === "reviews" && (
                <div className="text-foodie-text-light">
                  <p>Customer reviews will appear here.</p>
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
