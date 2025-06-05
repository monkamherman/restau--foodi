
import React, { Suspense, lazy } from 'react';

// Définir tous les composants de pages disponibles
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
} as const;

type PageKey = keyof typeof pageComponents;

interface DynamicPageLoaderProps {
  pageKey: string;
}

const DynamicPageLoader: React.FC<DynamicPageLoaderProps> = ({ pageKey }) => {
  console.log('Loading component with pageKey:', pageKey);
  
  // Normaliser la clé pour s'assurer qu'elle correspond
  const normalizedKey = pageKey as PageKey;
  console.log('Normalized key:', normalizedKey);
  
  // Vérifier si le composant existe
  if (!pageComponents[normalizedKey]) {
    console.error('No mapping found for component:', pageKey);
    const ErrorComponent = pageComponents['error/PageError'];
    return (
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="animate-spin h-10 w-10 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
        </div>
      }>
        <ErrorComponent />
      </Suspense>
    );
  }

  const LazyComponent = pageComponents[normalizedKey];

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-10 w-10 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    }>
      <LazyComponent />
    </Suspense>
  );
};

export default DynamicPageLoader;
