
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
import Dashboard from '@/pages/dashboard/Dashboard';
import DashboardHome from '@/pages/dashboard/pages/Home';
import Stats from '@/pages/dashboard/pages/Stats';
import OrdersManagement from '@/pages/dashboard/pages/Orders';
import UsersManagement from '@/pages/dashboard/pages/Users';
import CouponsManagement from '@/pages/dashboard/pages/Coupons';
import DashboardSettings from '@/pages/dashboard/pages/Settings';
import Reviews from '@/pages/dashboard/pages/Reviews';
import Reservations from '@/pages/dashboard/pages/Reservations';
import DishesManagement from '@/pages/admin/dishes/DishesManagement';

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
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: '',
            element: <DashboardHome />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'dishes',
            element: <DishesManagement />,
          },
          {
            path: 'orders',
            element: <OrdersManagement />,
          },
          {
            path: 'users',
            element: <UsersManagement />,
          },
          {
            path: 'reviews',
            element: <Reviews />,
          },
          {
            path: 'reservations',
            element: <Reservations />,
          },
          {
            path: 'coupons',
            element: <CouponsManagement />,
          },
          {
            path: 'settings',
            element: <DashboardSettings />,
          },
        ],
      },
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
          { path: '/', element: <DynamicPageLoader pageKey="home/Home" /> },
          { path: '/menu', element: <DynamicPageLoader pageKey="menu/Menu" /> },
          { path: '/delivery', element: <DynamicPageLoader pageKey="delivery/Delivery" /> },
          { path: '/gallery', element: <DynamicPageLoader pageKey="gallery/Gallery" /> },
          { path: '/cart', element: <DynamicPageLoader pageKey="cart/Cart" /> },
          { path: '/blog', element: <DynamicPageLoader pageKey="blog/Blog" /> },
          { path: '/about-us', element: <DynamicPageLoader pageKey="aboutUs/AboutUs" /> },
          { path: '/reservations', element: <DynamicPageLoader pageKey="reservations/Reservations" /> },
          { path: '/dish/:slug', element: <DynamicPageLoader pageKey="dishDetail/DishDetail" /> },

          // Private route
          {
            path: '/account',
            element: (
              <PrivateRoute>
                <DynamicPageLoader pageKey="account/UserAccount" />
              </PrivateRoute>
            ),
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
