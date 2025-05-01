
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Clock, CreditCard, PhoneCall } from "lucide-react";

const DeliveryPage = () => {
  return (
    <>
      <Header />
      <div className="pt-20">
        <div className="bg-foodie-primary/10 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Food Delivery</h1>
          <p className="text-foodie-text-light max-w-xl mx-auto">
            Fast, reliable delivery service to your doorstep
          </p>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-subtitle">DELIVERY INFORMATION</span>
                <h2 className="section-title">How Our Delivery Works</h2>
                <p className="text-foodie-text-light mb-8">
                  We pride ourselves on fast and efficient delivery service, bringing your favorite meals right to your doorstep while they're still hot and fresh.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-foodie-primary/10 rounded-full flex items-center justify-center text-foodie-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Delivery Areas</h3>
                      <p className="text-foodie-text-light">We deliver within a 5-mile radius of our restaurant</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-foodie-primary/10 rounded-full flex items-center justify-center text-foodie-primary">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Delivery Times</h3>
                      <p className="text-foodie-text-light">30 minutes or less for most orders</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-foodie-primary/10 rounded-full flex items-center justify-center text-foodie-primary">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Payment Methods</h3>
                      <p className="text-foodie-text-light">Cash on delivery or online payment</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-foodie-primary/10 rounded-full flex items-center justify-center text-foodie-primary">
                      <PhoneCall size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Contact</h3>
                      <p className="text-foodie-text-light">Call us at (555) 123-4567 to place your order</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1513639304702-1a643df7c9f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Food delivery" 
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-foodie-primary font-bold text-3xl">30</div>
                  <div className="text-foodie-text-light text-sm">mins or less</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DeliveryPage;
