
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true
  });
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier si les notifications sont supportées
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setIsSupported(true);
      updatePermissionState();
    }
  }, []);

  const updatePermissionState = () => {
    const currentPermission = Notification.permission;
    setPermission({
      granted: currentPermission === 'granted',
      denied: currentPermission === 'denied',
      default: currentPermission === 'default'
    });
  };

  const requestPermission = async () => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      updatePermissionState();
      
      if (result === 'granted') {
        toast({
          title: "Notifications activées",
          description: "Vous recevrez des alertes pour vos commandes et promotions."
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Notifications refusées",
          description: "Vous pouvez les activer dans les paramètres de votre navigateur."
        });
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!permission.granted) return;
    
    const defaultOptions: NotificationOptions = {
      icon: '/logo.png',
      badge: '/logo.png',
      tag: 'foodie-notification',
      ...options
    };

    try {
      new Notification(title, defaultOptions);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  };

  const sendOrderNotification = (orderId: string, status: string) => {
    const messages = {
      confirmed: 'Votre commande a été confirmée !',
      preparing: 'Votre commande est en préparation',
      ready: 'Votre commande est prête !',
      delivered: 'Votre commande a été livrée'
    };

    sendNotification(`Commande #${orderId}`, {
      body: messages[status as keyof typeof messages] || 'Mise à jour de votre commande',
      tag: `order-${orderId}`,
      data: { type: 'order', orderId, status }
    });
  };

  const sendPromotionNotification = (promotion: { title: string; description: string }) => {
    sendNotification('🎉 Nouvelle promotion !', {
      body: promotion.description,
      tag: 'promotion',
      data: { type: 'promotion', promotion }
    });
  };

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    sendOrderNotification,
    sendPromotionNotification
  };
};
