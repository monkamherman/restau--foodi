
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white py-4 shadow-sm fixed w-full z-50">
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center z-10">
          <div className="bg-foodie-primary text-white font-bold px-2 py-1 rounded text-xl">MENU</div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {["Home", "Menu", "Delivery", "About Us", "Blog"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase().replace(" ", "-")}`} 
                  className="font-medium text-foodie-text hover:text-foodie-primary transition-colors"
                >
                  {item}
                </a>
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
          <button className="text-foodie-text hover:text-foodie-primary transition-colors md:border-l md:pl-4 md:border-gray-200">
            <ShoppingCart size={20} />
          </button>
          <a href="#" className="hidden md:block btn-primary py-2">Order Online</a>
          
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
            {["Home", "Menu", "Delivery", "About Us", "Blog"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase().replace(" ", "-")}`} 
                  className="text-foodie-text hover:text-foodie-primary font-medium text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="btn-primary mt-4" onClick={() => setIsMenuOpen(false)}>
                Order Online
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
