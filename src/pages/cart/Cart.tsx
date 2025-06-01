
import { useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import MobilePaymentButton from "./components/MobilePaymentButton";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fettucini Salad",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
      price: 24.00,
      quantity: 1
    },
    {
      id: 2,
      name: "Vegetable Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      price: 20.00,
      quantity: 2
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Review your items before checkout
        </p>
      </div>
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Your cart is empty</h3>
                  <p className="text-foodie-text-light mb-6">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Link to="/menu" className="btn-primary">
                    Browse Menu
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
                        {/* <p className="text-foodie-primary font-medium">${item.price.toFixed(2)}</p> */}
                      </div>
                      
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="ml-6">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
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
                  ← Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foodie-text-light">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-foodie-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary w-full mb-4" disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </button>
                
                <MobilePaymentButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
