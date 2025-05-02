
import { Calendar, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Food Plating: A Visual Guide",
      excerpt: "Learn how professional chefs create stunning visual presentations with food and how you can apply these techniques at home.",
      date: "May 15, 2024",
      author: "Chef Maria",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
      category: "Cooking Tips"
    },
    {
      id: 2,
      title: "Seasonal Ingredients: Summer Edition",
      excerpt: "Discover the freshest ingredients of the season and how to incorporate them into your cooking for maximum flavor.",
      date: "May 10, 2024",
      author: "Nutritionist Alex",
      image: "https://images.unsplash.com/photo-1457296898342-cdd24585d095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
      category: "Seasonal"
    },
    {
      id: 3,
      title: "Behind the Scenes: Meet Our Master Chef",
      excerpt: "An exclusive interview with our head chef about his culinary journey, inspirations, and the philosophy behind our menu.",
      date: "May 5, 2024",
      author: "Food Critic Jamie",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3698&q=80",
      category: "Interview"
    }
  ];

  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Stay updated with our latest culinary stories, tips, and news
        </p>
      </div>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-foodie-primary bg-foodie-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                  <h3 className="font-bold text-xl mt-4 mb-3">{post.title}</h3>
                  <p className="text-foodie-text-light mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-foodie-text-light text-sm">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <a href="#" className="block text-center mt-6 text-foodie-primary font-medium hover:text-foodie-primary-dark transition-colors">Read More</a>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
