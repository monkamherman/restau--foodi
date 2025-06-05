
import React, { Suspense, lazy, memo } from 'react';
import PerformantLoader from './PerformantLoader';

// Définir tous les composants de pages disponibles avec préchargement intelligent
const pageComponents = {
  'home/Home': lazy(() => import('@/pages/home/Home')),
  'menu/Menu': lazy(() => import('@/pages/menu/Menu')),
  'delivery/Delivery': lazy(() => import('@/pages/delivery/Delivery')),
  'gallery/Gallery': lazy(() => import('@/pages/gallery/Gallery')),
  'cart/Cart': lazy(() => import('@/pages/cart/Cart')),
  'blog/Blog': lazy(() => import('@/pages/blog/Blog')),
  'aboutUs/AboutUs': lazy(() => import('@/pages/aboutUs/AboutUs')),
  'reservations/Reservations': lazy(() => import('@/pages/reservations/Reservations')),
  'account/UserAccount': lazy(() => import('@/pages/account/UserAccount')),
  'auth/Register': lazy(() => import('@/pages/auth/Register')),
  'auth/Login': lazy(() => import('@/pages/auth/Login')),
  'auth/VerifyOTP': lazy(() => import('@/pages/auth/VerifyOTP')),
  'auth/ForgotPassword': lazy(() => import('@/pages/auth/ForgotPassword')),
  'auth/ChangePassword': lazy(() => import('@/pages/auth/ChangePassword')),
  'profile/Profile': lazy(() => import('@/pages/profile/Profile')),
  'profile/UserProfile': lazy(() => import('@/pages/profile/UserProfile')),
  'admin/Dashboard': lazy(() => import('@/pages/admin/Dashboard')),
  'admin/components/AdminLayout': lazy(() => import('@/pages/admin/components/AdminLayout')),
  'error/PageError': lazy(() => import('@/pages/error/PageError')),
  'dishDetail/DishDetail': lazy(() => import('@/pages/dishDetail/DishDetail')),
} as const;

type PageKey = keyof typeof pageComponents;

interface DynamicPageLoaderProps {
  pageKey: string;
}

// Composant de fallback optimisé
const OptimizedFallback: React.FC = memo(() => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <PerformantLoader 
      variant="spinner" 
      size="lg" 
      text="Chargement..." 
      className="flex-col space-y-4"
    />
  </div>
));

OptimizedFallback.displayName = 'OptimizedFallback';

const DynamicPageLoader: React.FC<DynamicPageLoaderProps> = memo(({ pageKey }) => {
  console.log('Loading component with pageKey:', pageKey);
  
  // Normaliser la clé pour s'assurer qu'elle correspond
  const normalizedKey = pageKey as PageKey;
  console.log('Normalized key:', normalizedKey);
  
  // Vérifier si le composant existe
  if (!pageComponents[normalizedKey]) {
    console.error('No mapping found for component:', pageKey);
    const ErrorComponent = pageComponents['error/PageError'];
    return (
      <Suspense fallback={<OptimizedFallback />}>
        <ErrorComponent />
      </Suspense>
    );
  }

  const LazyComponent = pageComponents[normalizedKey];

  // Précharger les composants liés (optionnel)
  const preloadRelatedComponents = () => {
    // Précharger les composants susceptibles d'être utilisés ensuite
    if (normalizedKey === 'home/Home') {
      // Précharger le menu si on est sur la home
      pageComponents['menu/Menu'];
    }
  };

  // Démarrer le préchargement après un court délai
  React.useEffect(() => {
    const timer = setTimeout(preloadRelatedComponents, 1000);
    return () => clearTimeout(timer);
  }, [normalizedKey]);

  return (
    <Suspense fallback={<OptimizedFallback />}>
      <LazyComponent />
    </Suspense>
  );
});

DynamicPageLoader.displayName = 'DynamicPageLoader';

export default DynamicPageLoader;
