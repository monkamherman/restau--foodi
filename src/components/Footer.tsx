
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-foodie-primary text-white font-bold px-2 py-1 rounded text-xl">MENU</div>
            </div>
            <p className="text-foodie-text-light mb-6">
              Savor the taste of quality food and service at our restaurant.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-foodie-primary-light flex items-center justify-center text-foodie-primary hover:bg-foodie-primary hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-foodie-primary-light flex items-center justify-center text-foodie-primary hover:bg-foodie-primary hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-foodie-primary-light flex items-center justify-center text-foodie-primary hover:bg-foodie-primary hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6">Links to Go</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">About Us</a></li>
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Delivery</a></li>
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Menu</a></li>
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6">Menu</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Main Dishes</a></li>
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Breakfast</a></li>
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Desserts</a></li>
              <li><a href="#" className="text-foodie-text-light hover:text-foodie-primary">Drinks</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-foodie-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-foodie-text-light">237 Food Street, Yaounde-melen</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-foodie-primary mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-foodie-text-light hover:text-foodie-primary">+237658852731</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-foodie-primary mr-3 flex-shrink-0" />
                <a href="mailto:info@foodie.com" className="text-foodie-text-light hover:text-foodie-primary">info@foodie.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foodie-text-light text-sm mb-4 md:mb-0">
            © {currentYear} RAGE tech. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-foodie-text-light hover:text-foodie-primary text-sm">Privacy Policy</a>
            <a href="#" className="text-foodie-text-light hover:text-foodie-primary text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
