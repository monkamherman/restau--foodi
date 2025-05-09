
import { createBrowserRouter, Outlet } from 'react-router-dom'
import authRoutes from './routes-config/authRoutes'
import profileRoutes from './routes-config/profileRoutes'
import ScrollToTop from '@/components/custom/utils/ScrollToTop'
import PrivateRoute from '@/components/custom/utils/PrivateRoute'
import DynamicPageLoader from '@/components/custom/utils/LazyComponent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/hooks/auth'

/**
 * Creates a router with specified routes and elements for each route.
 * @param {Array} routes - An array of route objects containing path and element information.
 * @returns None
 */

const Router = createBrowserRouter([
	{
		path: '',
		element: (
			<AuthProvider>
				<Outlet />
				{/* To scroll to top each time that we change routes */}
				<ScrollToTop />
			</AuthProvider>
		),

		// Page erreur
		errorElement: <DynamicPageLoader pageKey="error/PageError" />,

		children: [
			{
				path: '/',
				element: <>
					<Header />
					<div className='min-h-[80vh]'>
						<Outlet />
					</div>
					<Footer />
				</>,
				children: [
					{
						path: '/',
						element: <DynamicPageLoader pageKey="home/Home" />
					},
                    
                    {
						path: '/gallery',
						element: <DynamicPageLoader pageKey="gallery/Gallery" />
					},

					// Exemple of private route
					{
						path: '/account',
						element: (
							<PrivateRoute>
								<DynamicPageLoader pageKey="account/UserAccount" />
							</PrivateRoute>
						)
					},
                    
                    // Admin routes
                    {
                        path: '/admin',
                        element: <DynamicPageLoader pageKey="admin/components/AdminLayout" />,
                        children: [
                            {
                                path: '',
                                element: <DynamicPageLoader pageKey="admin/Dashboard" />,
                            },
                            {
                                path: 'dishes',
                                element: <DynamicPageLoader pageKey="admin/dishes/DishesManagement" />,
                            },
                            {
                                path: 'reviews',
                                element: <DynamicPageLoader pageKey="admin/components/ReviewsManagement" />,
                            }
                        ]
                    },

					// Authentication routes part
					authRoutes,
                    
                    // Profile routes
                    profileRoutes,
				]
			},
		],
	},
])

export default Router
