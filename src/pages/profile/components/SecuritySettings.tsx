
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Shield, Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import UserRoleBadge from "@/components/custom/UserRoleBadge";

const SecuritySettings = () => {
  const { user, userRoles } = useAuth();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 8 caractères"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Les mots de passe ne correspondent pas",
        description: "Veuillez confirmer votre nouveau mot de passe"
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });

      if (signInError) {
        toast({
          variant: "destructive",
          title: "Mot de passe actuel incorrect",
          description: "Veuillez vérifier votre mot de passe actuel"
        });
        return;
      }

      // Then update password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été mis à jour avec succès"
      });
      
      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur lors du changement de mot de passe",
        description: error.message
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            Sécurité du compte
          </CardTitle>
          <CardDescription>
            Gérez la sécurité et les accès de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Key size={18} />
                Rôles utilisateur
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <UserRoleBadge />
              </div>
              <p className="text-sm text-muted-foreground">
                Vos rôles déterminent vos permissions et votre accès aux fonctionnalités
              </p>
            </div>
            
            <form onSubmit={handleChangePassword} className="space-y-4 mt-6">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Lock size={18} />
                Changer de mot de passe
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Le mot de passe doit contenir au moins 8 caractères
                  </p>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? "Modification en cours..." : "Modifier le mot de passe"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
