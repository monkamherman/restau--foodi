
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Sample cart count (in a real app, this would come from context/state)
  const cartItemCount = 3;

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Gallery", path: "/gallery" },
    { name: "Delivery", path: "/delivery" },
    { name: "About Us", path: "/about-us" },
    { name: "Blog", path: "/blog" }
  ];

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 w-full z-50">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center z-10">
          <div className="bg-foodie-primary text-white font-bold px-2 py-1 rounded text-xl">MENU</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className={cn(
                    "font-medium transition-colors",
                    location.pathname === item.path 
                      ? "text-foodie-primary" 
                      : "text-foodie-text hover:text-foodie-primary"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-foodie-text hover:text-foodie-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="text-foodie-text hover:text-foodie-primary transition-colors">
            <User size={20} />
          </button>
          <Link 
            to="/cart" 
            className="text-foodie-text hover:text-foodie-primary transition-colors md:border-l md:pl-4 md:border-gray-200 relative"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-foodie-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/menu" className="hidden md:block btn-primary py-2">Order Online</Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-foodie-text"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "fixed inset-0 bg-white flex items-center justify-center transition-all duration-300 md:hidden pt-16",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          <ul className="flex flex-col items-center space-y-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path}
                  className={cn(
                    "font-medium text-xl",
                    location.pathname === item.path
                      ? "text-foodie-primary" 
                      : "text-foodie-text hover:text-foodie-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cart" className="flex items-center text-xl" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="mr-2" />
                Cart {cartItemCount > 0 && <span className="ml-2 bg-foodie-primary text-white text-xs px-2 py-1 rounded-full">{cartItemCount}</span>}
              </Link>
            </li>
            <li>
              <Link to="/menu" className="btn-primary mt-4" onClick={() => setIsMenuOpen(false)}>
                Order Online
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
