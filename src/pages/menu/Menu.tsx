
import Categories from '@/components/Categories';
import FeaturedDishes from '@/components/FeaturedDishes';
import MenuItems from './components/MenuItems';

const Menu = () => {
  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Explore our wide range of delicious dishes prepared with fresh ingredients
        </p>
      </div>
      <Categories />
      <MenuItems />
      <FeaturedDishes />
    </div>
  );
};

export default Menu;
