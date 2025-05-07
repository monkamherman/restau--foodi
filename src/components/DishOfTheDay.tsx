
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";

const DishOfTheDay = () => {
  // Données du plat du jour (ces données pourraient venir d'une API ou base de données)
  const dishOfTheDay = {
    name: "Poulet DG Royal",
    description: "Notre plat signature: poulet tendre mijoté avec des plantains mûrs, poivrons frais, carottes et épices locales dans une sauce tomate parfumée aux herbes.",
    price: 7500,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1740&auto=format&fit=crop",
    discount: 15,
  };

  // Fonction pour formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(price);
  };

  // Calcul du prix après remise
  const discountedPrice = dishOfTheDay.price * (1 - dishOfTheDay.discount / 100);

  return (
    <section className="py-16 bg-foodie-primary/5">
      <div className="container-custom">
        <div className="flex items-center justify-center mb-6">
          <UtensilsCrossed className="text-foodie-primary mr-2" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold">Le Plat du Jour</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <div className="flex items-center mb-3">
              <span className="bg-foodie-primary text-white text-sm font-semibold px-2.5 py-1 rounded">
                -{dishOfTheDay.discount}%
              </span>
              <h3 className="ml-3 text-xl md:text-2xl font-bold">{dishOfTheDay.name}</h3>
            </div>
            
            <p className="text-foodie-text-light mb-4">{dishOfTheDay.description}</p>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-foodie-primary font-bold text-xl">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-foodie-text-light line-through text-sm">
                {formatPrice(dishOfTheDay.price)}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="default" className="bg-foodie-primary hover:bg-foodie-primary-dark">
                <Link to="/menu">Commander</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={`/dish/3`}>Voir les détails</Link>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-lg h-[300px]">
              <div className="absolute top-4 right-4 bg-foodie-primary text-white px-3 py-1 rounded-full font-semibold z-10">
                Spécialité
              </div>
              <img
                src={dishOfTheDay.image}
                alt={dishOfTheDay.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DishOfTheDay;
