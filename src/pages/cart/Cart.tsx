
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOptimizedCart } from "@/hooks/useOptimizedCart";
import { useToast } from "@/hooks/use-toast";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";
import PaymentMethodSelector from "./components/PaymentMethodSelector";

const Cart = () => {
  const { cart, cartSummary, updateQuantity, removeFromCart, clearCart } = useOptimizedCart();
  const { toast } = useToast();
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((itemId: string) => {
    const item = cart.items.find(item => item.id === itemId);
    if (item) {
      removeFromCart(itemId);
      toast({
        title: "Article retiré",
        description: `${item.name} a été retiré de votre panier`
      });
    }
  }, [cart.items, removeFromCart, toast]);

  const handlePayment = useCallback(() => {
    setIsProcessing(true);
    // Simuler un délai de traitement
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentSelector(true);
    }, 500);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setPaymentComplete(true);
    clearCart();
    setShowPaymentSelector(false);
    toast({
      title: "Paiement réussi !",
      description: "Votre commande a été confirmée"
    });
  }, [clearCart, toast]);

  if (paymentComplete) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-4 text-green-800">Paiement réussi !</h2>
              <p className="text-green-700 mb-6">
                Votre commande a été confirmée et sera livrée dans les plus brefs délais.
              </p>
              <Button asChild>
                <Link to="/menu">
                  Continuer mes achats
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            asChild
            className="mb-4"
          >
            <Link to="/menu" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Retour au menu
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold mb-4">Votre Panier</h1>
          <p className="text-muted-foreground max-w-xl">
            Vérifiez vos articles avant de passer commande
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">
              Articles du panier ({cartSummary.itemCount})
            </h2>
            
            {cartSummary.isEmpty ? (
              <EmptyCart />
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <CartSummary
              itemCount={cartSummary.itemCount}
              subtotal={cartSummary.subtotal}
              deliveryFee={cartSummary.deliveryFee}
              total={cartSummary.total}
              onCheckout={handlePayment}
              isLoading={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Sélecteur de méthode de paiement */}
      {showPaymentSelector && (
        <PaymentMethodSelector 
          amount={cartSummary.total} 
          onClose={() => setShowPaymentSelector(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Cart;
