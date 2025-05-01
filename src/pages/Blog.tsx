
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CalendarDays, User } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Healthy Food Recipes to Try This Summer",
      excerpt: "Discover delicious and nutritious recipes that are perfect for the summer season.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "June 15, 2023",
      author: "Chef Michel"
    },
    {
      id: 2,
      title: "The Art of Food Plating",
      excerpt: "Learn how professional chefs create beautiful and appetizing food presentations.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "May 22, 2023",
      author: "Sarah Johnson"
    },
    {
      id: 3,
      title: "Behind the Scenes: A Day in Our Kitchen",
      excerpt: "Take a peek into our restaurant kitchen and see how we prepare our signature dishes.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745adc4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "April 10, 2023",
      author: "David Miller"
    },
    {
      id: 4,
      title: "The History of Pasta: From Ancient Times to Modern Day",
      excerpt: "Explore the fascinating journey of one of the world's most beloved foods.",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
      date: "March 5, 2023",
      author: "Emma Thompson"
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-20">
        <div className="bg-foodie-primary/10 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-foodie-text-light max-w-xl mx-auto">
            Food stories, tips, and culinary inspirations
          </p>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-foodie-text-light mb-4">
                      <div className="flex items-center mr-6">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3">{post.title}</h3>
                    <p className="text-foodie-text-light mb-4">{post.excerpt}</p>
                    <a href="#" className="text-foodie-primary font-medium hover:underline">
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
