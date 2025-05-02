
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

type PrivateRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
};

const PrivateRoute = ({ 
  children, 
  requireAdmin = false,
  requireSuperAdmin = false 
}: PrivateRouteProps) => {
  const { user, isLoading, isAdmin, isSuperAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-10 w-10 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for admin requirement
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Check for super admin requirement
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated with appropriate permissions
  return <>{children}</>;
};

export default PrivateRoute;
