
import { ShoppingCart, Truck, Utensils, Gift } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Online Ordering",
      description: "Order from our extensive menu with just a few clicks",
      icon: <ShoppingCart className="text-foodie-primary" size={24} />
    },
    {
      title: "Fast Delivery",
      description: "Get your food delivered to your door in 30 minutes or less",
      icon: <Truck className="text-foodie-primary" size={24} />
    },
    {
      title: "Catering",
      description: "Let us cater your next event with our delicious menu options",
      icon: <Utensils className="text-foodie-primary" size={24} />
    },
    {
      title: "Gift Cards",
      description: "Give the gift of food with our convenient gift cards",
      icon: <Gift className="text-foodie-primary" size={24} />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="section-subtitle">OUR OFFERS & SERVICES</span>
            <h2 className="section-title">Our Culinary Journey<br/>And Services</h2>
            <p className="text-foodie-text-light mb-8 max-w-lg">
              Explore our rich heritage in culinary excellence, providing delicious food and impeccable service to our valued customers and communities.
            </p>
            
            <a href="#" className="btn-primary">
              Explore
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="font-medium text-lg mb-2">{service.title}</h3>
                <p className="text-foodie-text-light text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
