
import { Outlet } from "react-router-dom";
import DynamicPageLoader from "@/components/custom/utils/LazyComponent";
import PrivateRoute from "@/components/custom/utils/PrivateRoute";

const profileRoutes = {
  path: '',
  element: <Outlet />,
  children: [
    {
      path: '/account',
      element: (
        <PrivateRoute>
          <DynamicPageLoader pageKey="account/UserAccount" />
        </PrivateRoute>
      ),
    },
    {
      path: '/account/profile',
      element: (
        <PrivateRoute>
          <DynamicPageLoader pageKey="profile/UserProfile" />
        </PrivateRoute>
      ),
    },
    {
      path: '/account/security',
      element: (
        <PrivateRoute>
          <DynamicPageLoader pageKey="profile/components/SecuritySettings" />
        </PrivateRoute>
      ),
    }
  ]
};

export default profileRoutes;
