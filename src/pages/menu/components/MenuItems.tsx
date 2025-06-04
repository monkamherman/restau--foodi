
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
}

const categories = [
  { id: "all", label: "Tous" },
  { id: "entrees", label: "Entrées" },
  { id: "mains", label: "Plats Principaux" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Boissons" },
  { id: "specialties", label: "Spécialités" }
];

const MenuItems = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuItems();
    
    // Configuration des mises à jour en temps réel
    const channel = supabase
      .channel('menu-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dishes'
        },
        () => {
          console.log('Mise à jour en temps réel du menu détectée');
          fetchMenuItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du chargement du menu",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const createSlug = (item: MenuItem) => {
    const name = item.name.toLowerCase().replace(/\s+/g, '-');
    const category = item.category.toLowerCase();
    const origin = 'restaurant'; // Origine par défaut
    return `${name}-${category}-${origin}`;
  };

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
      toast({
        title: "Retiré des favoris",
        description: "Le plat a été retiré de vos favoris."
      });
    } else {
      newFavorites.add(itemId);
      toast({
        title: "Ajouté aux favoris",
        description: "Le plat a été ajouté à vos favoris."
      });
    }
    setFavorites(newFavorites);
  };

  const addToCart = (item: MenuItem) => {
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier.`
    });
  };

  if (isLoading) {
    return (
      <section id="menu" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">Chargement du menu...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">
            Délices Culinaires
          </span>
          <h2 className="section-title">
            Notre Sélection de Plats
          </h2>
          <p className="text-foodie-text-light max-w-2xl mx-auto mt-8">
            Découvrez notre menu soigneusement élaboré mettant en valeur les saveurs authentiques,
            préparé avec des ingrédients frais et locaux pour une expérience culinaire inoubliable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-2 border transition-all duration-300",
                activeCategory === category.id
                  ? "bg-foodie-primary text-white border-foodie-primary"
                  : "border-gray-300 text-foodie-text hover:border-foodie-primary"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white shadow-md hover:shadow-lg transition-shadow relative group">
              <div className="h-60 overflow-hidden relative">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={cn(
                    "absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-colors",
                    favorites.has(item.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                  )}
                >
                  <Heart size={16} className={favorites.has(item.id) ? "fill-current" : ""} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <span className="text-foodie-primary font-bold text-xl">{formatPrice(item.price)}</span>
                </div>
                <p className="text-foodie-text-light text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-foodie-primary text-xs uppercase tracking-wider">
                    {categories.find(cat => cat.id === item.category)?.label || item.category}
                  </span>
                  {item.is_featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Coup de cœur
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/dish/${createSlug(item)}`}>Voir détails</Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="px-3"
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingCart size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun plat disponible dans cette catégorie.</p>
          </div>
        )}

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
