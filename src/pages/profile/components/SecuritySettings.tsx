
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecuritySettings = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur s'est produite lors de la déconnexion"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de sécurité</CardTitle>
        <CardDescription>Gérez les paramètres de sécurité de votre compte</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Mot de passe</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Vous pouvez changer votre mot de passe en cliquant sur le bouton ci-dessous
          </p>
          <Button variant="outline" onClick={navigateToChangePassword}>
            Modifier le mot de passe
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Sessions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Déconnectez-vous de toutes les sessions actives
          </p>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            disabled={isLoading}
          >
            {isLoading ? "Déconnexion en cours..." : "Déconnexion"}
          </Button>
        </div>

        <Alert className="bg-amber-50 border-amber-200 mt-6">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-800">
            Si vous souhaitez supprimer votre compte, veuillez contacter notre support.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
