
import { Truck, MapPin, Clock } from "lucide-react";

const Delivery = () => {
  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Delivery</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Fast and reliable delivery service to your doorstep
        </p>
      </div>
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="section-title">Getting Your Food Has<br />Never Been Easier</h2>
              <p className="text-foodie-text-light mb-8">
                We deliver your food fresh and hot to your doorstep. Our delivery service is fast and reliable, ensuring that you get your food as quickly as possible.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="text-foodie-primary" size={24} />,
                    title: "Wide Coverage Area",
                    description: "We deliver to most areas within the city and surrounding suburbs."
                  },
                  {
                    icon: <Truck className="text-foodie-primary" size={24} />,
                    title: "Professional Couriers",
                    description: "Our delivery team ensures your food arrives in perfect condition."
                  },
                  {
                    icon: <Clock className="text-foodie-primary" size={24} />,
                    title: "Timely Delivery",
                    description: "We promise to deliver within 30-45 minutes of order confirmation."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-foodie-text-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Delivery Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Delivery Hours</h4>
                  <p className="text-foodie-text-light">Monday - Friday: 10:00 AM - 10:00 PM</p>
                  <p className="text-foodie-text-light">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Delivery Fee</h4>
                  <p className="text-foodie-text-light">$0 - $5 depending on your location</p>
                  <p className="text-foodie-text-light">Free delivery for orders over $30</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Minimum Order</h4>
                  <p className="text-foodie-text-light">$15 for delivery orders</p>
                  <p className="text-foodie-text-light">No minimum for pickup orders</p>
                </div>
              </div>
              
              <button className="btn-primary w-full mt-8">Order Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Delivery;
