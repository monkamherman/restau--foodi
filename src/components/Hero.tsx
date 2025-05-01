
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen relative overflow-hidden bg-restaurant-dark"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative h-full container-custom flex flex-col justify-center items-center text-center text-white z-10">
        <div className="animate-fade-in">
          <span className="text-restaurant-gold uppercase tracking-widest text-sm md:text-base font-light mb-4 block">
            Welcome to Gusto Restaurant
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 max-w-4xl mx-auto">
            Experience Fine Dining at its Best
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Exquisite cuisine carefully crafted with the freshest ingredients
            for an unforgettable culinary journey
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#reservation" className="btn-primary">
              Book a Table
            </a>
            <a href="#menu" className="btn-outline">
              Explore Menu
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center text-white hover:text-restaurant-gold transition-colors"
        >
          <span className="text-xs uppercase tracking-widest mb-2">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-white animate-pulse"></div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
