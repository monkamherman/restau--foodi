
import { useAuth } from "@/hooks/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserRoleBadge from "@/components/custom/UserRoleBadge";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { user } = useAuth();

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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Paramètres du profil
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/profile/security">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Sécurité &amp; Rôles
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/cart">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                      </svg>
                      Mes commandes
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start">
                    <Link to="/account">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Paramètres du compte
                    </Link>
                  </Button>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
