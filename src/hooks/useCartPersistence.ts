
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  category?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  updatedAt: string;
}

const CART_STORAGE_KEY = 'foodie-cart';
const CART_EXPIRY_HOURS = 24;

export const useCartPersistence = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    updatedAt: new Date().toISOString()
  });
  const { toast } = useToast();

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    loadCart();
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    if (cart.items.length > 0) {
      saveCart(cart);
    }
  }, [cart]);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart: Cart = JSON.parse(savedCart);
        
        // Vérifier si le panier n'a pas expiré
        const cartAge = Date.now() - new Date(parsedCart.updatedAt).getTime();
        const maxAge = CART_EXPIRY_HOURS * 60 * 60 * 1000;
        
        if (cartAge < maxAge) {
          setCart(parsedCart);
          if (parsedCart.items.length > 0) {
            toast({
              title: "Panier restauré",
              description: `${parsedCart.items.length} article(s) retrouvé(s) dans votre panier.`
            });
          }
        } else {
          // Panier expiré, le supprimer
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const saveCart = (cartToSave: Cart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartToSave));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(cartItem => cartItem.id === item.id);
      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Article déjà dans le panier, augmenter la quantité
        newItems = prevCart.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Nouvel article
        newItems = [...prevCart.items, { ...item, quantity }];
      }

      const newTotal = newItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal,
        updatedAt: new Date().toISOString()
      };
    });

    toast({
      title: "Ajouté au panier",
      description: `${item.name} x${quantity}`
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        items: newItems,
        total: newTotal,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      updatedAt: new Date().toISOString()
    });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getCartSummary = () => ({
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    total: cart.total,
    isEmpty: cart.items.length === 0
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSummary
  };
};
