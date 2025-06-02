
import { useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentMethodSelector from "./components/PaymentMethodSelector";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fettucini Salad",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
      price: 12000, // Prix en FCFA
      quantity: 1
    },
    {
      id: 2,
      name: "Vegetable Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      price: 10000, // Prix en FCFA
      quantity: 2
    }
  ]);
  
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2500; // 2500 FCFA
  const total = subtotal + deliveryFee;

  const handlePayment = () => {
    setShowPaymentSelector(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setCartItems([]);
    setShowPaymentSelector(false);
  };

  if (paymentComplete) {
    return (
      <div className="pt-20">
        <div className="container-custom py-16">
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-4 text-green-800">Paiement réussi !</h2>
              <p className="text-green-700 mb-6">
                Votre commande a été confirmée et sera livrée dans les plus brefs délais.
              </p>
              <Link to="/menu" className="btn-primary">
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Votre Panier</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Vérifiez vos articles avant de passer commande
        </p>
      </div>
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Articles du panier</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Votre panier est vide</h3>
                  <p className="text-foodie-text-light mb-6">
                    Il semble que vous n'ayez encore ajouté aucun article à votre panier.
                  </p>
                  <Link to="/menu" className="btn-primary">
                    Parcourir le menu
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={`${item.image}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80`} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-foodie-primary font-medium">{item.price.toLocaleString()} FCFA</p>
                      </div>
                      
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="ml-6">
                        <span className="font-medium">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <Link to="/menu" className="text-foodie-primary hover:text-foodie-primary-dark font-medium">
                  ← Continuer mes achats
                </Link>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Résumé de la commande</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Sous-total</span>
                    <span className="font-medium">{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Frais de livraison</span>
                    <span className="font-medium">{deliveryFee.toLocaleString()} FCFA</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-foodie-primary">{total.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handlePayment}
                  className="btn-primary w-full" 
                  disabled={cartItems.length === 0}
                >
                  Procéder au paiement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Method Selector Modal */}
      {showPaymentSelector && (
        <PaymentMethodSelector 
          amount={total} 
          onClose={() => setShowPaymentSelector(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Cart;
