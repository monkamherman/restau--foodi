
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

const menuItems = [
  {
    id: 1,
    name: "Pan Seared Scallops",
    description: "Fresh scallops with pea puree, crispy pancetta, and lemon butter sauce",
    price: 24,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
  },
  {
    id: 2,
    name: "Classic Beef Tartare",
    description: "Hand-cut beef with capers, shallots, mustard, and quail egg",
    price: 22,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1635146037526-e3f4b5ade6eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 3,
    name: "Filet Mignon",
    description: "Grass-fed beef tenderloin with truffled mashed potatoes and seasonal vegetables",
    price: 48,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 4,
    name: "Herb-Crusted Rack of Lamb",
    description: "Dijon mustard and herb-crusted lamb with rosemary jus and garlic roasted potatoes",
    price: 42,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1625393355676-f473ef7d1e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 5,
    name: "Chocolate Soufflé",
    description: "Warm chocolate soufflé with vanilla bean ice cream",
    price: 16,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d8e3ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 6,
    name: "Signature Martini",
    description: "House-infused gin with elderflower and fresh citrus",
    price: 18,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1482349212652-744925892164?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding bg-restaurant-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-restaurant-gold uppercase tracking-widest text-sm mb-4 block">
            Delicious Offerings
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 inline-block gold-underline">
            Our Menu Selection
          </h2>
          <p className="text-restaurant-gray max-w-2xl mx-auto mt-8">
            Discover our carefully curated menu featuring seasonal ingredients and signature dishes 
            that showcase the best of international cuisine with a modern twist.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 border transition-all duration-300",
                activeCategory === category
                  ? "bg-restaurant-burgundy text-white border-restaurant-burgundy"
                  : "border-restaurant-gray text-restaurant-dark hover:border-restaurant-burgundy"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-playfair font-bold text-xl">{item.name}</h3>
                  <span className="text-restaurant-burgundy font-playfair text-xl">${item.price}</span>
                </div>
                <p className="text-restaurant-gray text-sm mb-4">{item.description}</p>
                <span className="text-restaurant-gold text-xs uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="btn-primary">View Full Menu</a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
