
import { Salad, Pizza, Cake, Sandwich, Coffee, Wine, Beef, Fish } from "lucide-react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Main Dish",
      icon: <Pizza className="text-foodie-primary" size={28} />,
      slug: "main-dish"
    },
    {
      name: "Break Fast",
      icon: <Sandwich className="text-foodie-primary" size={28} />,
      slug: "breakfast"
    },
    {
      name: "Dessert",
      icon: <Cake className="text-foodie-primary" size={28} />,
      slug: "dessert"
    },
    {
      name: "Salads",
      icon: <Salad className="text-foodie-primary" size={28} />,
      slug: "salads"
    },
    {
      name: "Beverages",
      icon: <Coffee className="text-foodie-primary" size={28} />,
      slug: "beverages"
    },
    {
      name: "Wine & Spirits",
      icon: <Wine className="text-foodie-primary" size={28} />,
      slug: "wine"
    },
    {
      name: "Steaks",
      icon: <Beef className="text-foodie-primary" size={28} />,
      slug: "steaks"
    },
    {
      name: "Seafood",
      icon: <Fish className="text-foodie-primary" size={28} />,
      slug: "seafood"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center section-title mb-12">Popular Categories</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              to={`/menu?category=${category.slug}`}
              key={category.name}
              className="category-card hover:border-foodie-primary hover:shadow-md transition-all"
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <h3 className="font-medium text-sm md:text-base">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
