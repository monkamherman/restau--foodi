
import { Outlet } from "react-router-dom";
import DynamicPageLoader from "@/components/custom/utils/LazyComponent";
import PrivateRoute from "@/components/custom/utils/PrivateRoute";

const profileRoutes = {
  path: '',
  element: <Outlet />,
  children: [
    {
      path: '/profile',
      element: (
        <PrivateRoute>
          <DynamicPageLoader pageKey="profile/Profile" />
        </PrivateRoute>
      ),
    },
    {
      path: '/profile/settings',
      element: (
        <PrivateRoute>
          <DynamicPageLoader pageKey="profile/UserProfile" />
        </PrivateRoute>
      ),
    },
    {
      path: '/profile/security',
      element: (
        <PrivateRoute>
          <DynamicPageLoader pageKey="profile/components/SecuritySettings" />
        </PrivateRoute>
      ),
    }
  ]
};

export default profileRoutes;
