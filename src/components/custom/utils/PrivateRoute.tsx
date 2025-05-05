
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
  const { toast } = useToast();

  useEffect(() => {
    // Afficher un message si l'utilisateur n'a pas les permissions nécessaires
    if (!isLoading && user) {
      if ((requireAdmin && !isAdmin) || (requireSuperAdmin && !isSuperAdmin)) {
        toast({
          variant: "destructive",
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
        });
      }
    }
  }, [user, isLoading, isAdmin, isSuperAdmin, requireAdmin, requireSuperAdmin, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-10 w-10 border-4 border-foodie-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Non connecté
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier les permissions admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Vérifier les permissions super admin
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  // L'utilisateur est authentifié avec les permissions appropriées
  return <>{children}</>;
};

export default PrivateRoute;
