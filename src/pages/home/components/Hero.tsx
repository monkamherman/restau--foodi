
import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="pt-28 pb-16 md:pb-24"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Dive into Delights <br />
              Of Delectable <span className="text-foodie-primary">Food</span>
            </h1>
            <p className="text-foodie-text-light text-lg mb-8 max-w-lg">
              Where Every Dish Becomes a Story of Culinary Excellence and Creative Expression - Every Bite a Masterpiece!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#menu" className="btn-primary">
                Order Now
              </a>
              <a href="#" className="flex items-center text-foodie-text hover:text-foodie-primary transition-colors">
                <div className="w-10 h-10 bg-foodie-primary-light rounded-full flex items-center justify-center mr-3">
                  <Play size={18} className="text-foodie-primary ml-1" />
                </div>
                <span className="font-medium">Watch Video</span>
              </a>
            </div>
            
            {/* Food cards */}
            <div className="mt-10 flex space-x-4">
              <div className="bg-white shadow-md rounded-lg p-2 flex items-center space-x-3 relative">
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80" 
                    alt="Pizza" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Pepperoni Pizza</h4>
                  <div className="flex items-center">
                    <span className="text-foodie-rating text-xs">★★★★★</span>
                    <span className="text-xs text-foodie-text-light ml-1">5.0</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-2 flex items-center space-x-3">
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80" 
                    alt="Chicken Burger" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Chicken Burger</h4>
                  <div className="flex items-center">
                    <span className="text-foodie-rating text-xs">★★★★☆</span>
                    <span className="text-xs text-foodie-text-light ml-1">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-foodie-primary rounded-full mx-auto overflow-hidden">
                <img 
                  src="/chef.jpeg" 
                  alt="Hero Image" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
