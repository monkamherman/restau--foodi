
import { Salad, Pizza, Cake, Sandwich } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      name: "Main Dish",
      icon: <Pizza className="text-foodie-primary" size={28} />
    },
    {
      name: "Break Fast",
      icon: <Sandwich className="text-foodie-primary" size={28} />
    },
    {
      name: "Dessert",
      icon: <Cake className="text-foodie-primary" size={28} />
    },
    {
      name: "Browse All",
      icon: <Salad className="text-foodie-primary" size={28} />
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center section-title mb-12">Popular Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div key={category.name} className="category-card">
              <div className="category-icon">
                {category.icon}
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
