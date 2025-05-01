
import { Heart } from "lucide-react";

const FeaturedDishes = () => {
  const dishes = [
    {
      id: 1,
      name: "Fettucini Salad",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      price: 24.00,
      rating: 4.9,
      reviews: 86,
      badge: "New"
    },
    {
      id: 2,
      name: "Vegetable Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      price: 20.00,
      rating: 4.8,
      reviews: 47
    },
    {
      id: 3,
      name: "Egg Fried Rice",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      price: 22.00,
      rating: 4.9,
      reviews: 53,
      badge: "Top"
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="section-subtitle">SPECIAL DISHES</span>
            <h2 className="section-title">Standout Dishes<br/>From Our Menu</h2>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-foodie-primary hover:text-white transition-colors">
              ←
            </button>
            <button className="w-10 h-10 rounded-full bg-foodie-primary text-white flex items-center justify-center">
              →
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              {dish.badge && (
                <span className="dish-badge">{dish.badge}</span>
              )}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-60 object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-foodie-primary transition-colors">
                  <Heart size={18} />
                </button>
              </div>
              <h3 className="font-bold text-lg mb-2">{dish.name}</h3>
              <div className="flex justify-between items-center">
                <span className="font-bold text-foodie-primary">${dish.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <span className="text-foodie-rating">★</span>
                  <span className="ml-1 mr-1">{dish.rating}</span>
                  <span className="text-foodie-text-light text-sm">({dish.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
