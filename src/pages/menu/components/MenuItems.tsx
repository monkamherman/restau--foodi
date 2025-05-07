
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = ["All", "Entrées", "Plats Principaux", "Desserts", "Boissons", "Spécialités"];

const menuItems = [
  {
    id: 1,
    name: "Ndolè",
    description: "Feuilles de ndolè mijotées avec de la pâte d'arachide, servies avec des crevettes et du poisson fumé",
    price: 5000,
    category: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1562888871-a4fd23bea597?q=80&w=1587&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Accras de Poisson",
    description: "Beignets de poisson épicés, légers et croustillants",
    price: 2500,
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1635146037526-e3f4b5ade6eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 3,
    name: "Poulet DG",
    description: "Poulet braisé avec bananes plantains, légumes et sauce épicée",
    price: 6500,
    category: "Spécialités",
    image: "https://images.unsplash.com/photo-1562967915-92ae0c320a01?q=80&w=1587&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Eru",
    description: "Feuilles de melon sauvage cuisinées avec de la viande fumée, du poisson séché et de l'huile de palme",
    price: 4800,
    category: "Plats Principaux",
    image: "https://images.unsplash.com/photo-1625393355676-f473ef7d1e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 5,
    name: "Beignets Soufflés",
    description: "Beignets traditionnels légers et moelleux, saupoudrés de sucre",
    price: 1500,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d8e3ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 6,
    name: "Jus de Gingembre",
    description: "Boisson rafraîchissante au gingembre frais avec une touche de citron",
    price: 1200,
    category: "Boissons",
    image: "https://images.unsplash.com/photo-1482349212652-744925892164?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
  },
  {
    id: 7,
    name: "Koki",
    description: "Gâteau traditionnel de haricots cuits à la vapeur dans des feuilles de bananier",
    price: 3000,
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1583467875263-d50dec37a88c?q=80&w=1587&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Sanga",
    description: "Maïs frais grillé servi avec des épices locales",
    price: 1000,
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?q=80&w=1587&auto=format&fit=crop"
  }
];

const MenuItems = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(price);
  };

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">
            Délices Camerounais
          </span>
          <h2 className="section-title">
            Notre Sélection de Plats
          </h2>
          <p className="text-foodie-text-light max-w-2xl mx-auto mt-8">
            Découvrez notre menu soigneusement élaboré mettant en valeur les saveurs authentiques du Cameroun,
            préparé avec des ingrédients frais et locaux pour une expérience culinaire inoubliable.
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
                  ? "bg-foodie-primary text-white border-foodie-primary"
                  : "border-gray-300 text-foodie-text hover:border-foodie-primary"
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
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <span className="text-foodie-primary font-bold text-xl">{formatPrice(item.price)}</span>
                </div>
                <p className="text-foodie-text-light text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-foodie-primary text-xs uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/dish/${item.id}`}>Détails</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" className="btn-primary" asChild>
            <Link to="/menu">Voir Tout Le Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
