
import { lazy, Suspense } from 'react';
import { Loader } from 'lucide-react';

// This component dynamically loads page components based on a pageKey string
const DynamicPageLoader = ({ pageKey }: { pageKey: string }) => {
  // Use React.lazy to dynamically import the component
  const LazyComponent = lazy(() => {
    // Split the key into directory and file parts
    const [directory, file] = pageKey.split('/');
    
    // Import the component based on directory structure
    return import(`../../../pages/${directory}/${file}.tsx`);
  });

  // Wrap with Suspense to handle loading state
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader size={40} className="animate-spin text-foodie-primary" />
        <span className="ml-3 text-lg">Loading...</span>
      </div>
    }>
      <LazyComponent />
    </Suspense>
  );
};

export default DynamicPageLoader;
