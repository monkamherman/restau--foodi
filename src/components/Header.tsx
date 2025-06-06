
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import PersistentCartIndicator from '@/components/custom/cart/PersistentCartIndicator';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Foodie" className="h-8 w-8" />
            <span className="text-xl font-bold text-foodie-primary">Foodie</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foodie-text hover:text-foodie-primary transition-colors">
              Accueil
            </Link>
            <Link to="/menu" className="text-foodie-text hover:text-foodie-primary transition-colors">
              Menu
            </Link>
            <Link to="/about" className="text-foodie-text hover:text-foodie-primary transition-colors">
              À propos
            </Link>
            <Link to="/reservations" className="text-foodie-text hover:text-foodie-primary transition-colors">
              Réservations
            </Link>
            <Link to="/contact" className="text-foodie-text hover:text-foodie-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <PersistentCartIndicator />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-foodie-text hover:text-foodie-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foodie-text hover:text-foodie-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/menu" 
                className="text-foodie-text hover:text-foodie-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/about" 
                className="text-foodie-text hover:text-foodie-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/reservations" 
                className="text-foodie-text hover:text-foodie-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Réservations
              </Link>
              <Link 
                to="/contact" 
                className="text-foodie-text hover:text-foodie-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/account" 
                className="text-foodie-text hover:text-foodie-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mon Compte
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
