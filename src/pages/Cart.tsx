
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart, Trash, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MobilePayment from "@/components/MobilePayment";

// Sample cart items (in a real app, this would come from context/state)
const initialCartItems = [
  {
    id: 1,
    name: "Fettucini Salad",
    price: 24.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Egg Fried Rice",
    price: 22.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [showMobilePayment, setShowMobilePayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleMobilePayment = () => {
    setShowMobilePayment(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setCartItems([]);
    setShowMobilePayment(false);
  };

  return (
    <>
      <Header />
      <div className="pt-20 pb-16">
        <div className="bg-foodie-primary/10 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
          <p className="text-foodie-text-light max-w-xl mx-auto">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="container-custom py-12">
          {paymentComplete ? (
            <div className="text-center py-10">
              <Alert className="max-w-md mx-auto mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Your payment was successful! Your order is being processed.
                </AlertDescription>
              </Alert>
              <ShoppingCart className="mx-auto mb-4 text-green-500" size={48} />
              <h2 className="text-2xl font-bold mb-4">Thank You For Your Order!</h2>
              <p className="text-foodie-text-light mb-6">
                You'll receive a confirmation email shortly.
              </p>
              <Link to="/menu" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-10 border rounded-lg bg-gray-50">
                    <ShoppingCart className="mx-auto mb-4 text-foodie-text-light" size={48} />
                    <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                    <p className="text-foodie-text-light mb-6">
                      Add some delicious items from our menu
                    </p>
                    <Link to="/menu" className="btn-primary">
                      Browse Menu
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div 
                        key={item.id} 
                        className="flex items-center border rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-foodie-primary font-bold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border rounded-md">
                            <button 
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Order Summary */}
              <div className="border rounded-lg p-6 h-fit bg-gray-50">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-foodie-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-foodie-primary hover:bg-foodie-primary-dark flex items-center justify-center gap-2"
                    disabled={cartItems.length === 0}
                  >
                    <CreditCard size={18} />
                    Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-foodie-primary text-foodie-primary hover:bg-foodie-primary hover:text-white flex items-center justify-center gap-2"
                    onClick={handleMobilePayment}
                    disabled={cartItems.length === 0}
                  >
                    <Smartphone size={18} />
                    Mobile Payment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Payment Modal */}
        {showMobilePayment && (
          <MobilePayment 
            amount={total} 
            onClose={() => setShowMobilePayment(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
