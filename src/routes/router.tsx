import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/custom/utils/ScrollToTop'
import authRoutes from './routes-config/authRoutes'
import profileRoutes from './routes-config/profileRoutes'
import PrivateRoute from '@/components/custom/utils/PrivateRoute'
import DynamicPageLoader from '@/components/custom/utils/LazyComponent'
import { AuthProvider } from '@/hooks/auth'

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
					<Navbar />
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
						path: '/menu',
						element: <DynamicPageLoader pageKey="menu/Menu" />
					},
					{
						path: '/delivery',
						element: <DynamicPageLoader pageKey="delivery/Delivery" />
					},
					{
						path: '/about-us',
						element: <DynamicPageLoader pageKey="aboutUs/AboutUs" />
					},
					{
						path: '/blog',
						element: <DynamicPageLoader pageKey="blog/Blog" />
					},
					{
						path: '/cart',
						element: <DynamicPageLoader pageKey="cart/Cart" />
					},
					{
						path: '/dish/:id',
						element: <DynamicPageLoader pageKey="dishDetail/DishDetail" />
					},
					{
						path: '/account',
						element: (
							<PrivateRoute>
								<DynamicPageLoader pageKey="account/UserAccount" />
							</PrivateRoute>
						)
					},
					// Profile routes
					profileRoutes,
					// Authentication routes
					authRoutes,
				]
			},
			// Admin routes
			{
				path: '/admin',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/Dashboard" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/dishes',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/dishes/DishesManagement" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/dishes/new',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/dishes/DishForm" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/dishes/:id',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/dishes/DishForm" />
					</PrivateRoute>
				)
			},
			// Additional admin routes to be implemented
			{
				path: '/admin/promotions',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/promotions/PromotionsManagement" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/coupons',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/coupons/CouponsManagement" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/orders',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/orders/OrdersManagement" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/reviews',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/reviews/ReviewsManagement" />
					</PrivateRoute>
				)
			},
			{
				path: '/admin/users',
				element: (
					<PrivateRoute requireAdmin={true}>
						<DynamicPageLoader pageKey="admin/users/UsersManagement" />
					</PrivateRoute>
				)
			},
		],
	},
])

export default Router
