
import { useMemo } from 'react';
import { useCartPersistence } from '@/hooks/useCartPersistence';

export const useOptimizedCart = () => {
  const cartHook = useCartPersistence();

  // Mémoriser les calculs du panier
  const cartSummary = useMemo(() => {
    const itemCount = cartHook.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartHook.cart.total;
    const deliveryFee = subtotal > 0 ? 2.50 : 0; // Livraison gratuite si panier vide
    const total = subtotal + deliveryFee;

    return {
      itemCount,
      subtotal,
      deliveryFee,
      total,
      isEmpty: cartHook.cart.items.length === 0
    };
  }, [cartHook.cart.items, cartHook.cart.total]);

  // Optimiser les callbacks pour éviter les re-renders
  const updateQuantity = useMemo(() => cartHook.updateQuantity, [cartHook.updateQuantity]);
  const removeFromCart = useMemo(() => cartHook.removeFromCart, [cartHook.removeFromCart]);
  const addToCart = useMemo(() => cartHook.addToCart, [cartHook.addToCart]);
  const clearCart = useMemo(() => cartHook.clearCart, [cartHook.clearCart]);

  return {
    cart: cartHook.cart,
    cartSummary,
    updateQuantity,
    removeFromCart,
    addToCart,
    clearCart
  };
};
