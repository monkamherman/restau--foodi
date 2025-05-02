
import { Link } from 'react-router-dom';

const PageError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-foodie-primary mb-4">404</h1>
      <p className="text-xl md:text-2xl font-medium mb-6">Page not found</p>
      <p className="text-foodie-text-light text-center mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary">
        Return to Home
      </Link>
    </div>
  );
};

export default PageError;
