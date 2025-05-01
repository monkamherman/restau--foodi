
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="relative z-10">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-foodie-primary rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="Chef" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div>
            <span className="section-subtitle">TESTIMONIALS</span>
            <h2 className="section-title">What Our Customers<br/>Say About Us</h2>
            
            <div className="testimonial-card mb-6">
              <p className="italic text-foodie-text-light mb-4">
                "This is fantastic! So much flavor and texture. I usually hate salads but this one really hit the spot—and the protein was cooked to perfection!"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/43.jpg" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Amanda Rogers</h4>
                  <div className="flex text-foodie-rating">
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                    <Star size={16} fill="currentColor" strokeWidth={0} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 30}.jpg`}
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-foodie-primary flex items-center justify-center text-white text-xs">
                +43
              </div>
            </div>
            <p className="text-foodie-text-light mt-2">Satisfied Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
