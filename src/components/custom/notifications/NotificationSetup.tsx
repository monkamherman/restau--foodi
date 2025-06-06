
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, BellOff, Settings } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationSetup: React.FC = () => {
  const { isSupported, permission, requestPermission } = useNotifications();

  if (!isSupported) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BellOff className="w-5 h-5 text-yellow-600" />
            <CardTitle className="text-lg text-yellow-800">Notifications non supportées</CardTitle>
          </div>
          <CardDescription className="text-yellow-700">
            Votre navigateur ne supporte pas les notifications push.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (permission.granted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-green-600" />
            <CardTitle className="text-lg text-green-800">Notifications activées</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Vous recevrez des alertes pour vos commandes et les promotions.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (permission.denied) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BellOff className="w-5 h-5 text-red-600" />
            <CardTitle className="text-lg text-red-800">Notifications bloquées</CardTitle>
          </div>
          <CardDescription className="text-red-700">
            Les notifications ont été refusées. Vous pouvez les réactiver dans les paramètres de votre navigateur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Ouvrir les paramètres
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Activer les notifications</CardTitle>
        </div>
        <CardDescription>
          Recevez des alertes en temps réel pour vos commandes et les nouvelles promotions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">Vous serez notifié pour :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Confirmation et suivi de vos commandes</li>
              <li>Nouvelles promotions et offres spéciales</li>
              <li>Plats du jour et recommandations</li>
            </ul>
          </div>
          <Button onClick={requestPermission} className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Activer les notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSetup;
