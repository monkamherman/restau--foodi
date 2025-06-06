
import React from 'react';
import NotificationSetup from '@/components/custom/notifications/NotificationSetup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <NotificationSetup />
      
      <Card>
        <CardHeader>
          <CardTitle>Préférences de notification</CardTitle>
          <CardDescription>
            Choisissez les types de notifications que vous souhaitez recevoir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="order-notifications">Notifications de commande</Label>
              <p className="text-sm text-gray-500">
                Confirmations, préparation, livraison
              </p>
            </div>
            <Switch id="order-notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="promotion-notifications">Promotions</Label>
              <p className="text-sm text-gray-500">
                Offres spéciales et nouveautés
              </p>
            </div>
            <Switch id="promotion-notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reminder-notifications">Rappels</Label>
              <p className="text-sm text-gray-500">
                Panier abandonné, plats favoris
              </p>
            </div>
            <Switch id="reminder-notifications" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
