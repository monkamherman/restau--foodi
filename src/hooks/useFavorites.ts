
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category?: string;
  addedAt: string;
}

export interface QuickOrder {
  id: string;
  name: string;
  items: FavoriteItem[];
  total: number;
  createdAt: string;
  lastUsed: string;
}

const FAVORITES_STORAGE_KEY = 'foodie-favorites';
const QUICK_ORDERS_STORAGE_KEY = 'foodie-quick-orders';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [quickOrders, setQuickOrders] = useState<QuickOrder[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadFavorites();
    loadQuickOrders();
  }, []);

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
  };

  const loadQuickOrders = () => {
    try {
      const saved = localStorage.getItem(QUICK_ORDERS_STORAGE_KEY);
      if (saved) {
        setQuickOrders(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes rapides:', error);
    }
  };

  const saveFavorites = (favs: FavoriteItem[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  };

  const saveQuickOrders = (orders: QuickOrder[]) => {
    try {
      localStorage.setItem(QUICK_ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commandes rapides:', error);
    }
  };

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const newFavorites = [...favorites, { ...item, addedAt: new Date().toISOString() }];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
    
    toast({
      title: "Ajouté aux favoris",
      description: `${item.name} a été ajouté à vos favoris.`
    });
  };

  const removeFromFavorites = (itemId: string) => {
    const newFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
    
    toast({
      title: "Retiré des favoris",
      description: "Le plat a été retiré de vos favoris."
    });
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const createQuickOrder = (name: string, items: FavoriteItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const newOrder: QuickOrder = {
      id: `quick-${Date.now()}`,
      name,
      items,
      total,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };

    const newQuickOrders = [...quickOrders, newOrder];
    setQuickOrders(newQuickOrders);
    saveQuickOrders(newQuickOrders);
    
    toast({
      title: "Commande rapide créée",
      description: `"${name}" a été sauvegardée pour vos prochaines commandes.`
    });
    
    return newOrder;
  };

  const useQuickOrder = (orderId: string) => {
    const order = quickOrders.find(o => o.id === orderId);
    if (!order) return null;

    // Mettre à jour la date d'utilisation
    const updatedOrders = quickOrders.map(o =>
      o.id === orderId ? { ...o, lastUsed: new Date().toISOString() } : o
    );
    setQuickOrders(updatedOrders);
    saveQuickOrders(updatedOrders);

    return order;
  };

  const deleteQuickOrder = (orderId: string) => {
    const newQuickOrders = quickOrders.filter(order => order.id !== orderId);
    setQuickOrders(newQuickOrders);
    saveQuickOrders(newQuickOrders);
    
    toast({
      title: "Commande rapide supprimée",
      description: "La commande a été retirée de vos favoris."
    });
  };

  const getRecentFavorites = (limit: number = 5) => {
    return favorites
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, limit);
  };

  const getFrequentlyUsedOrders = (limit: number = 3) => {
    return quickOrders
      .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
      .slice(0, limit);
  };

  return {
    favorites,
    quickOrders,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    createQuickOrder,
    useQuickOrder,
    deleteQuickOrder,
    getRecentFavorites,
    getFrequentlyUsedOrders
  };
};
