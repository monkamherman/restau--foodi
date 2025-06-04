
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Save
} from 'lucide-react';

const DashboardSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // États pour les différents paramètres
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: 'Restaurant Foodie',
    description: 'Un restaurant moderne avec une cuisine exceptionnelle',
    email: 'contact@restaurant-foodie.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Gastronomie, Paris'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    reviewAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 30
  });

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true);
    try {
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Paramètres sauvegardés",
        description: `Les paramètres ${section} ont été mis à jour avec succès.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-8 w-8 text-foodie-primary" />
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">Gérez les paramètres de votre restaurant</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Apparence
          </TabsTrigger>
        </TabsList>

        {/* Paramètres Généraux */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Configurez les informations de base de votre restaurant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Nom du restaurant</Label>
                  <Input
                    id="restaurant-name"
                    value={generalSettings.restaurantName}
                    onChange={(e) => setGeneralSettings(prev => ({
                      ...prev,
                      restaurantName: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={generalSettings.description}
                  onChange={(e) => setGeneralSettings(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('généraux')}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications par email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      emailNotifications: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications par SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      smsNotifications: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications push</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications push dans le navigateur
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      pushNotifications: checked
                    }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes de commandes</Label>
                    <p className="text-sm text-muted-foreground">
                      Être notifié des nouvelles commandes
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderAlerts}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      orderAlerts: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes d'avis</Label>
                    <p className="text-sm text-muted-foreground">
                      Être notifié des nouveaux avis clients
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reviewAlerts}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      reviewAlerts: checked
                    }))}
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('de notifications')}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de Sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>
                Configurez les options de sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajouter une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      twoFactorAuth: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications de connexion</Label>
                    <p className="text-sm text-muted-foreground">
                      Être notifié des nouvelles connexions
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      loginNotifications: checked
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value) || 30
                    }))}
                    className="w-32"
                  />
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('de sécurité')}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres d'Apparence */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence du dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <p className="text-sm text-muted-foreground">
                    Choisissez entre le thème clair et sombre
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="w-24">
                      Clair
                    </Button>
                    <Button variant="outline" className="w-24">
                      Sombre
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Couleur principale</Label>
                  <p className="text-sm text-muted-foreground">
                    Couleur de base pour les éléments d'interface
                  </p>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-blue-500 cursor-pointer border-2 border-transparent hover:border-gray-300"></div>
                    <div className="w-8 h-8 rounded bg-green-500 cursor-pointer border-2 border-transparent hover:border-gray-300"></div>
                    <div className="w-8 h-8 rounded bg-red-500 cursor-pointer border-2 border-transparent hover:border-gray-300"></div>
                    <div className="w-8 h-8 rounded bg-purple-500 cursor-pointer border-2 border-transparent hover:border-gray-300"></div>
                    <div className="w-8 h-8 rounded bg-orange-500 cursor-pointer border-2 border-gray-300"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Langue de l'interface</Label>
                  <select className="w-48 px-3 py-2 border border-gray-300 rounded-md">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings("d'apparence")}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
