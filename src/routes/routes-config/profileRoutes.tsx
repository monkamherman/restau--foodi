
import { Outlet } from "react-router-dom";
import DynamicPageLoader from "@/components/custom/utils/LazyComponent";

const profileRoutes = {
  path: '',
  element: <Outlet />,
  children: [
    {
      path: '/profile',
      element: <DynamicPageLoader pageKey="profile/Profile" />,
    },
    {
      path: '/profile/settings',
      element: <DynamicPageLoader pageKey="profile/UserProfile" />,
    },
    {
      path: '/profile/security',
      element: <DynamicPageLoader pageKey="profile/components/SecuritySettings" />,
    }
  ]
};

export default profileRoutes;
