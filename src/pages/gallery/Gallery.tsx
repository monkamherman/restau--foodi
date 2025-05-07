
import { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious
} from "@/components/ui/carousel";
import { 
  Dialog, 
  DialogContent, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Restaurant Interior",
    description: "Elegant dining room with modern décor and warm ambiance.",
    category: "interior"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Outdoor Terrace",
    description: "Beautiful terrace seating with garden views.",
    category: "outdoor"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Private Dining",
    description: "Intimate private dining room for special occasions.",
    category: "interior"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Bar Lounge",
    description: "Sophisticated bar with premium spirits and craft cocktails.",
    category: "interior"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Garden Seating",
    description: "Tranquil garden area perfect for summer dining.",
    category: "outdoor"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    title: "Chef's Table",
    description: "Exclusive dining experience with direct view of the kitchen.",
    category: "kitchen"
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [openImage, setOpenImage] = useState<GalleryItem | null>(null);
  
  const filteredItems = filter 
    ? galleryItems.filter(item => item.category === filter) 
    : galleryItems;
    
  const categories = Array.from(new Set(galleryItems.map(item => item.category)));

  return (
    <div className="py-20">
      {/* Hero Section */}
      <div className="bg-foodie-primary/10 py-20 text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Restaurant Gallery</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Experience the ambiance and design of our restaurant through our gallery
        </p>
      </div>
      
      <div className="container-custom">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={filter === null ? "default" : "outline"}
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Mobile Carousel View */}
        <div className="block md:hidden mb-16">
          <Carousel className="w-full">
            <CarouselContent>
              {filteredItems.map((item) => (
                <CarouselItem key={item.id}>
                  <div 
                    className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => setOpenImage(item)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => setOpenImage(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                <p className="text-white/90 text-sm mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Restaurant Space Description */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Dining Spaces</h2>
          <p className="text-foodie-text-light mb-8">
            Our restaurant offers a variety of dining environments to suit every occasion. From our elegant main dining room to the relaxing outdoor terrace and intimate private dining areas, we've created spaces that enhance your culinary experience while providing comfort and style.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border border-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Main Dining</h3>
              <p className="text-foodie-text-light">Elegant space with comfortable seating for up to 80 guests.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Outdoor Terrace</h3>
              <p className="text-foodie-text-light">Beautiful garden setting perfect for al fresco dining.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Private Rooms</h3>
              <p className="text-foodie-text-light">Intimate spaces for special events and celebrations.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-screen Image Dialog */}
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <img 
              src={openImage?.image} 
              alt={openImage?.title} 
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
              <h2 className="text-xl font-bold">{openImage?.title}</h2>
              <p className="text-sm text-white/80">{openImage?.description}</p>
            </div>
            <DialogClose className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
