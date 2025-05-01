
import { useState } from "react";
import { Calendar, Clock, Phone, Mail, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would normally send the data to a server
    alert("Thank you for your reservation request. We'll confirm shortly!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2"
    });
  };

  return (
    <section id="reservation" className="section-padding bg-restaurant-dark text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-restaurant-gold uppercase tracking-widest text-sm mb-4 block">
              Reserve a Table
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 gold-underline">
              Make a Reservation
            </h2>
            <p className="text-gray-300 mb-10 leading-relaxed">
              Secure your dining experience at Gusto. For special occasions or groups larger than 8, 
              please call us directly for personalized arrangements.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-restaurant-gold p-3 rounded-full mr-4">
                  <Phone size={20} className="text-restaurant-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-restaurant-gold p-3 rounded-full mr-4">
                  <Mail size={20} className="text-restaurant-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-gray-300">reservations@gustorestaurant.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-restaurant-gold p-3 rounded-full mr-4">
                  <Clock size={20} className="text-restaurant-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Hours</h3>
                  <p className="text-gray-300">Mon-Thu: 5pm - 10pm</p>
                  <p className="text-gray-300">Fri-Sun: 5pm - 11pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white text-restaurant-dark p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-restaurant-gold outline-none"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-restaurant-gold outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-restaurant-gold outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block mb-2 font-medium">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-restaurant-gold outline-none"
                    />
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="time" className="block mb-2 font-medium">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-restaurant-gold outline-none"
                    />
                    <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block mb-2 font-medium">
                    Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-restaurant-gold outline-none appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-restaurant-burgundy text-white py-4 font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
              >
                <CalendarCheck size={20} className="mr-2" />
                Reserve Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
