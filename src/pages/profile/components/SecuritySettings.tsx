
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UserRoleBadge from "@/components/custom/UserRoleBadge";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/hooks/auth/types";

const SecuritySettings = () => {
  const { user, userRoles, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p>Veuillez vous connecter pour accéder à vos paramètres de sécurité.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Cette méthode n'est pas complète - dans une application réelle, vous voudriez
      // vérifier le mot de passe actuel avant d'autoriser la mise à jour
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été mis à jour avec succès.",
      });
      
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors du changement de mot de passe.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        Sécurité et Rôles <UserRoleBadge />
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de Rôle</CardTitle>
            <CardDescription>Vos rôles et permissions actuels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Vos rôles:</h3>
                <div className="flex flex-wrap gap-2">
                  {userRoles.length > 0 ? (
                    userRoles.map((role) => (
                      <Badge 
                        key={role} 
                        variant={
                          role === 'super-admin' 
                            ? "destructive" 
                            : role === 'admin' 
                              ? "default" 
                              : "secondary"
                        }
                      >
                        {role}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline">Aucun rôle</Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Permissions:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {userRoles.includes('super-admin') && (
                    <>
                      <li>Accès complet à toutes les fonctionnalités</li>
                      <li>Gestion des administrateurs et des utilisateurs</li>
                      <li>Configuration système complète</li>
                    </>
                  )}
                  
                  {userRoles.includes('admin') && (
                    <>
                      <li>Accès au tableau de bord d'administration</li>
                      <li>Gestion des plats et des menus</li>
                      <li>Gestion des commandes et des promotions</li>
                    </>
                  )}
                  
                  <li>Commander des plats et accéder à votre profil</li>
                  <li>Laisser des avis sur les plats</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sécurité du Compte</CardTitle>
            <CardDescription>Gérez vos identifiants de sécurité</CardDescription>
          </CardHeader>
          <CardContent>
            {!isChangingPassword ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Email:</h3>
                  <p className="text-sm">{user.email}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Mot de passe:</h3>
                  <p className="text-sm">••••••••</p>
                </div>
                
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  variant="outline"
                  className="mt-2"
                >
                  Changer le mot de passe
                </Button>
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium">
                    Mot de passe actuel
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    Nouveau mot de passe
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" variant="default">
                    Enregistrer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Détails sur les rôles du système</CardTitle>
            <CardDescription>Comprendre les différents niveaux d'accès</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <div className="flex items-center mb-2">
                    <Badge variant="secondary">user</Badge>
                  </div>
                  <p className="text-sm">Rôle standard attribué à tous les utilisateurs enregistrés. Permet d'accéder aux fonctionnalités de base comme commander des plats et gérer son profil.</p>
                </div>
                
                <div className="p-4 border rounded">
                  <div className="flex items-center mb-2">
                    <Badge variant="default">admin</Badge>
                  </div>
                  <p className="text-sm">Rôle pour les gestionnaires de l'application. Les administrateurs peuvent accéder au tableau de bord et gérer les plats, les commandes et les promotions.</p>
                </div>
                
                <div className="p-4 border rounded">
                  <div className="flex items-center mb-2">
                    <Badge variant="destructive">super-admin</Badge>
                  </div>
                  <p className="text-sm">Niveau d'accès le plus élevé. Les super-administrateurs ont un contrôle total sur l'application, y compris la gestion des utilisateurs et des administrateurs.</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-muted/50 rounded">
                <p className="text-sm">
                  <strong>Note :</strong> Les changements de rôle ne peuvent être effectués que par un super-administrateur. 
                  Si vous avez besoin de modifier vos permissions, veuillez contacter un super-administrateur.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;
