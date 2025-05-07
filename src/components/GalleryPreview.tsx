
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GalleryPreview = () => {
  // A subset of images for the preview
  const galleryImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Restaurant Interior",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Outdoor Terrace",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Private Dining Room",
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Ambiance</h2>
          <p className="text-foodie-text-light max-w-2xl mx-auto">
            Experience the warm and inviting atmosphere of our restaurant through our gallery. From elegant indoor seating to our beautiful terrace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {galleryImages.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Link to="/gallery" className="block aspect-[4/3]">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/gallery" className="inline-flex items-center text-foodie-primary hover:text-foodie-primary-dark font-medium">
            View Full Gallery <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
