
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';

const AboutUs = () => {
  return (
    <div className="pt-20">
      <div className="bg-foodie-primary/10 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-foodie-text-light max-w-xl mx-auto">
          Get to know our story and our culinary philosophy
        </p>
      </div>
      <About />
      <Testimonials />
    </div>
  );
};

export default AboutUs;
