
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DynamicPageLoaderProps {
  pageKey: string;
}

/**
 * Dynamically loads a page component based on the provided key.
 * 
 * @param {Object} props - Component props
 * @param {string} props.pageKey - The key for the page component to load
 * @returns {JSX.Element} The loaded component or fallback
 */
const DynamicPageLoader = ({ pageKey }: DynamicPageLoaderProps) => {
  // Debug logs
  console.log('Loading component with pageKey:', pageKey);
  
  // Normalize the pageKey
  const normalizedKey = pageKey.replace(/^\//, '');
  console.log('Normalized key:', normalizedKey);

  // Mapping des composants
  const componentMap: { [key: string]: () => Promise<{ default: React.ComponentType }>} = {
    // Pages principales
    'Home': () => import('@/pages/home/Home'),
    'Menu': () => import('@/pages/menu/Menu'),
    'Delivery': () => import('@/pages/delivery/Delivery'),
    'Gallery': () => import('@/pages/gallery/Gallery'),
    'Cart': () => import('@/pages/cart/Cart'),
    'Blog': () => import('@/pages/blog/Blog'),
    'AboutUs': () => import('@/pages/aboutUs/AboutUs'),
    'NotFound': () => import('@/pages/NotFound'),
    'Index': () => import('@/pages/Index'),
    'DishDetail': () => import('@/pages/dishDetail/DishDetail'),

    // Pages d'authentification
    'auth/Login': () => import('@/pages/auth/Login'),
    'auth/Register': () => import('@/pages/auth/Register'),
    'auth/ForgotPassword': () => import('@/pages/auth/ForgotPassword'),
    'auth/ChangePassword': () => import('@/pages/auth/ChangePassword'),
    'auth/VerifyOTP': () => import('@/pages/auth/VerifyOTP'),

    // Pages de profil
    'Profile': () => import('@/pages/profile/Profile'),
    'UserProfile': () => import('@/pages/profile/UserProfile'),

    // Pages de compte
    'UserAccount': () => import('@/pages/account/UserAccount'),

    // Pages d'administration
    'AdminLayout': () => import('@/pages/admin/components/AdminLayout'),
    'Dashboard': () => import('@/pages/admin/Dashboard'),
    'DishesManagement': () => import('@/pages/admin/dishes/DishesManagement'),
    'ReviewsManagement': () => import('@/pages/admin/components/ReviewsManagement'),
    'DishForm': () => import('@/pages/admin/dishes/DishForm'),

    // Composants de profil
    'SecuritySettings': () => import('@/pages/profile/components/SecuritySettings'),
    'ReviewList': () => import('@/pages/profile/components/ReviewList'),
    'PersonalInformation': () => import('@/pages/account/components/PersonalInformation'),
    'OrdersTab': () => import('@/pages/account/components/OrdersTab'),
    'FavoritesTab': () => import('@/pages/account/components/FavoritesTab'),
    'ProfileTab': () => import('@/pages/account/components/ProfileTab'),
    'SettingsTab': () => import('@/pages/account/components/SettingsTab'),
    'ReviewsTab': () => import('@/pages/account/components/ReviewsTab'),

    // Composants de menu
    'MenuItems': () => import('@/pages/menu/components/MenuItems'),

    // Composants de panier
    'MobilePaymentButton': () => import('@/pages/cart/components/MobilePaymentButton'),

    // Page d'erreur
    'error/PageError': () => import('@/pages/error/PageError')
  };

  // Get the component import function from the map
  const importFn = componentMap[normalizedKey];
  
  // Create the component
  const Component = lazy(() => {
    if (!importFn) {
      console.error(`No mapping found for component: ${pageKey}`);
      return Promise.resolve({
        default: () => (
          <div className="p-4 bg-red-100 rounded-lg text-red-700">
            <h3 className="font-bold mb-2">Composant non trouvé</h3>
            <p className="text-sm">Le composant <code className="bg-gray-200 p-1 rounded">{pageKey}</code> n'est pas disponible.</p>
          </div>
        )
      });
    }

    return importFn().catch(error => {
      console.error(`Failed to load component: ${pageKey}`, error);
      console.error('Error details:', error.stack);
      return Promise.resolve({
        default: () => (
          <div className="p-4 bg-red-100 rounded-lg text-red-700">
            <h3 className="font-bold mb-2">Erreur de chargement</h3>
            <p className="text-sm">Le composant <code className="bg-gray-200 p-1 rounded">{pageKey}</code> n'a pas pu être chargé.</p>
          </div>
        )
      });
    });
  });

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

// Composant à afficher en cas d'erreur de chargement
const PageNotFound = ({ pageKey }: { pageKey: string }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-2xl font-bold mb-4">Composant non trouvé</h2>
    <p className="text-gray-500">
      Le composant <code className="bg-gray-100 p-1 rounded">{pageKey}</code> n'a pas pu être chargé.
    </p>
  </div>
);

const LoadingFallback = () => (
  <div className="p-8 w-full">
    <Skeleton className="h-8 w-1/2 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

export default DynamicPageLoader;
