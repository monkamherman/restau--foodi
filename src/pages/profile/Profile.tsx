
import { useAuth } from "@/hooks/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserRoleBadge from "@/components/custom/UserRoleBadge";
import { Badge } from "@/components/ui/badge";
import { Settings, ShoppingCart, User, BarChart3 } from "lucide-react";

const Profile = () => {
  const { user, isAdmin, isSuperAdmin } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto mt-8 p-6">
        <Card>
          <CardContent className="p-6">
            <p>Veuillez vous connecter pour accéder à votre profil.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userInitials = user.email ? user.email[0].toUpperCase() : "U";
  const hasAdminAccess = isAdmin || isSuperAdmin;

  return (
    <div className="container mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        Mon Profil <UserRoleBadge />
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Informations Utilisateur</CardTitle>
              <CardDescription>Vos informations de base</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.user_metadata?.avatar_url || ''} alt="Avatar" />
                <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-1">
                {user.user_metadata?.first_name || user.user_metadata?.lastName || user.email}
              </h2>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">ID: {user.id.substring(0, 8)}...</Badge>
                <UserRoleBadge />
              </div>
              
              <div className="mt-6 w-full">
                <Button asChild className="w-full">
                  <Link to="/profile/settings">Modifier le profil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Paramètres</CardTitle>
              <CardDescription>Gérez vos paramètres de compte</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Liens rapides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/profile/settings">
                      <User className="mr-2 h-4 w-4" />
                      Paramètres du profil
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/profile/security">
                      <Settings className="mr-2 h-4 w-4" />
                      Sécurité &amp; Rôles
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/cart">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Mes commandes
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/account">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres du compte
                    </Link>
                  </Button>
                  
                  {/* Dashboard access for admin users */}
                  {hasAdminAccess && (
                    <Button variant="default" asChild className="justify-start bg-foodie-primary hover:bg-foodie-primary/90">
                      <Link to="/dashboard">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Accéder au Dashboard
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Informations sur les rôles</CardTitle>
              <CardDescription>Comprendre les rôles utilisateur</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">user</Badge>
                  <span>Utilisateur standard avec accès aux fonctionnalités de base</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="default" className="mr-2">admin</Badge>
                  <span>Administrateur avec accès au tableau de bord et gestion des plats</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="destructive" className="mr-2">super-admin</Badge>
                  <span>Super administrateur avec tous les droits, y compris la gestion des utilisateurs</span>
                </div>
                
                {hasAdminAccess && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      🎉 Vous avez accès au dashboard d'administration ! 
                      Cliquez sur le bouton "Accéder au Dashboard" ci-dessus pour gérer le restaurant.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
