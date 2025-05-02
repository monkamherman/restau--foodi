
import Hero from './components/Hero';
import Categories from '@/components/Categories';
import FeaturedDishes from '@/components/FeaturedDishes';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedDishes />
      <Testimonials />
      <Services />
    </>
  );
};

export default Home;
