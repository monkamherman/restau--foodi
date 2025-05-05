
import { useAuth } from "@/hooks/auth";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/hooks/auth/types";

const UserRoleBadge = () => {
  const { userRoles, user } = useAuth();

  if (!user) {
    return null;
  }

  // Déterminer le rôle le plus élevé pour affichage
  const getHighestRole = (roles: Role[]): { role: Role, variant: "default" | "secondary" | "destructive" | "outline" } => {
    if (roles.includes('super-admin')) {
      return { role: 'super-admin', variant: "destructive" };
    }
    if (roles.includes('admin')) {
      return { role: 'admin', variant: "default" };
    }
    return { role: 'user', variant: "secondary" };
  };

  const { role, variant } = getHighestRole(userRoles);

  return (
    <Badge variant={variant} className="ml-2">
      {role}
    </Badge>
  );
};

export default UserRoleBadge;
