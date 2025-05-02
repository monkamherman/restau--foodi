
import { lazy, Suspense } from 'react';

interface DynamicPageLoaderProps {
  pageKey: string;
}

const DynamicPageLoader = ({ pageKey }: DynamicPageLoaderProps) => {
  const LazyComponent = lazy(() => import(`@/pages/${pageKey}`));
  
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default DynamicPageLoader;
