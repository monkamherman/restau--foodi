
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
    )}>
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="z-10">
          <h1 className={cn(
            "font-playfair font-bold text-2xl transition-all duration-300",
            isScrolled ? "text-restaurant-dark" : "text-white"
          )}>
            GUSTO
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {["Home", "About", "Menu", "Reservation", "Contact"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={cn(
                    "font-lato uppercase tracking-widest text-sm font-medium transition-all duration-300",
                    isScrolled ? "text-restaurant-dark hover:text-restaurant-burgundy" : "text-white hover:text-restaurant-gold"
                  )}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className={cn(
            "md:hidden z-10 transition-all duration-300",
            isScrolled ? "text-restaurant-dark" : "text-white"
          )}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div className={cn(
          "fixed inset-0 bg-restaurant-dark bg-opacity-95 flex items-center justify-center transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          <ul className="flex flex-col items-center space-y-8">
            {["Home", "About", "Menu", "Reservation", "Contact"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white hover:text-restaurant-gold font-lato uppercase tracking-widest text-xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
