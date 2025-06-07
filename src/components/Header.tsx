
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CartIndicator from '@/components/custom/cart/CartIndicator';

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
            <Link to="/reservations" className="text-foodie-text hover:text-foodie-primary transition-colors">
              Réservations
            </Link>
            <Link to="/about-us" className="text-foodie-text hover:text-foodie-primary transition-colors">
              À propos
            </Link>
            <Link to="/gallery" className="text-foodie-text hover:text-foodie-primary transition-colors">
            Gallery
            </Link>
            <Link to="/blog" className="text-foodie-text hover:text-foodie-primary transition-colors">
              Blogs
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Indicator */}
            <CartIndicator />
            
            {/* User Account Button */}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/account" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                {/* <span className="hidden sm:inline">Compte</span> */}
              </Link>
            </Button>

            {/* Login/Register Buttons */}
            {/* <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">S'inscrire</Link>
              </Button>
            </div> */}
            
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
              {/* <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link 
                  to="/login"
                  className="text-foodie-text hover:text-foodie-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register"
                  className="text-foodie-text hover:text-foodie-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
