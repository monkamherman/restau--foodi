
import Categories from '@/components/Categories';
import FeaturedDishes from '@/components/FeaturedDishes';
import MenuItems from './components/MenuItems';
import FeedbackForm from '@/components/FeedbackForm';

const Menu = () => {
  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Notre Menu</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Découvrez notre large sélection de plats délicieux préparés avec des ingrédients frais locaux
        </p>
      </div>
      <Categories />
      <MenuItems />
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Votre Avis Compte</h2>
          <FeedbackForm />
        </div>
      </div>
      <FeaturedDishes />
    </div>
  );
};

export default Menu;
