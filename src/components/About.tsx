
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-restaurant-gold uppercase tracking-widest text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 gold-underline">
              A Culinary Journey Since 1995
            </h2>
            <p className="text-restaurant-gray mb-6 leading-relaxed">
              Founded by acclaimed Chef Michel Bernard, Gusto Restaurant has been serving 
              exceptional cuisine for over 25 years. What began as a small family restaurant 
              has evolved into one of the city's premier dining destinations.
            </p>
            <p className="text-restaurant-gray mb-8 leading-relaxed">
              Our philosophy is simple – create memorable dining experiences through outstanding 
              food, impeccable service, and an elegant ambiance. We source the finest 
              ingredients from local producers and international suppliers to ensure every 
              dish meets our exacting standards.
            </p>
            <div className="flex items-center space-x-6">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80" 
                alt="Chef Michel Bernard" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-playfair font-bold text-lg">Michel Bernard</p>
                <p className="text-restaurant-gold text-sm">Executive Chef & Founder</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2974&q=80" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute border-2 border-restaurant-gold w-full h-full top-6 right-6 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
