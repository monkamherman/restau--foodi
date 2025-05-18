import { createBrowserRouter, Outlet } from 'react-router-dom';
import  ScrollToTop  from '@/components/custom/utils/ScrollToTop';
import { AuthProvider } from '@/hooks/auth';
import  PrivateRoute  from '@/components/custom/utils/PrivateRoute';
import DynamicPageLoader from '@/components/custom/utils/LazyComponent';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Routes configuration
import authRoutes from './routes-config/authRoutes';
import profileRoutes from './routes-config/profileRoutes';

const Router = createBrowserRouter([
  {
    path: '',
    element: (
      <AuthProvider>
        <>
          <Outlet />
          <ScrollToTop />
        </>
      </AuthProvider>
    ),
    errorElement: <DynamicPageLoader pageKey="error/PageError" />,

    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <div className='min-h-[80vh]'>
              <Outlet />
            </div>
            <Footer />
          </>
        ),
        children: [
          { path: '/', element: <DynamicPageLoader pageKey="Home" /> },
          { path: '/menu', element: <DynamicPageLoader pageKey="Menu" /> },
          { path: '/delivery', element: <DynamicPageLoader pageKey="Delivery" /> },
          { path: '/gallery', element: <DynamicPageLoader pageKey="Gallery" /> },
          { path: '/cart', element: <DynamicPageLoader pageKey="Cart" /> },
          { path: '/blog', element: <DynamicPageLoader pageKey="Blog" /> },
          { path: '/about-us', element: <DynamicPageLoader pageKey="AboutUs" /> },

          // Private route
          {
            path: '/account',
            element: (
              <PrivateRoute>
                <DynamicPageLoader pageKey="UserAccount" />
              </PrivateRoute>
            ),
          },

          // Admin routes
          {
            path: '/admin',
            element: <DynamicPageLoader pageKey="AdminLayout" />,
            children: [
              { path: '', element: <DynamicPageLoader pageKey="Dashboard" /> },
              { path: 'dishes', element: <DynamicPageLoader pageKey="DishesManagement" /> },
              { path: 'reviews', element: <DynamicPageLoader pageKey="ReviewsManagement" /> },
            ],
          },

          // Authentication routes
          authRoutes,

          // Profile routes
          profileRoutes,
        ],
      },
    ],
  },
]);

export default Router;
