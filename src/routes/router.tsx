
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/custom/utils/ScrollToTop'
import authRoutes from './routes-config/authRoutes'
import DynamicPageLoader from '@/components/custom/utils/LazyComponent'

const Router = createBrowserRouter([
	{
		path: '',
		element: (
			<>
				<Outlet />
				{/* To scroll to top each time that we change routes */}
				<ScrollToTop />
			</>
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
					// Authentication routes part
					authRoutes,
				]
			},
		],
	},
])

export default Router
