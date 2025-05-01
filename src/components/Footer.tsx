
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-restaurant-dark text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h2 className="font-playfair font-bold text-2xl mb-6">GUSTO</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Experience fine dining at its best, with exquisite cuisine and impeccable service in an elegant setting.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-restaurant-burgundy hover:bg-restaurant-gold transition-colors duration-300 p-2 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-restaurant-burgundy hover:bg-restaurant-gold transition-colors duration-300 p-2 rounded-full">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-restaurant-burgundy hover:bg-restaurant-gold transition-colors duration-300 p-2 rounded-full">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-restaurant-gold mr-2">Address:</span>
                <span className="text-gray-400">123 Gourmet Street, Culinary District, City</span>
              </li>
              <li className="flex items-center">
                <span className="text-restaurant-gold mr-2">Phone:</span>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <span className="text-restaurant-gold mr-2">Email:</span>
                <a href="mailto:info@gustorestaurant.com" className="text-gray-400 hover:text-white">info@gustorestaurant.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6">Opening Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-restaurant-gold">Monday - Thursday</span>
                <span className="text-gray-400">5:00 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-restaurant-gold">Friday - Saturday</span>
                <span className="text-gray-400">5:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-restaurant-gold">Sunday</span>
                <span className="text-gray-400">5:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 text-white focus:border-restaurant-gold outline-none"
              />
              <button
                type="submit"
                className="w-full bg-restaurant-burgundy text-white py-3 hover:bg-restaurant-gold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} Gusto Restaurant. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
