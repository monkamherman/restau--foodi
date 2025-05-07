
import Hero from './components/Hero';
import DishOfTheDay from '@/components/DishOfTheDay';
import Categories from '@/components/Categories';
import FeaturedDishes from '@/components/FeaturedDishes';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';
import GalleryPreview from '@/components/GalleryPreview';

const Home = () => {
  return (
    <>
      <Hero />
      <DishOfTheDay />
      <Categories />
      <FeaturedDishes />
      <GalleryPreview />
      <Testimonials />
      <Services />
    </>
  );
};

export default Home;
