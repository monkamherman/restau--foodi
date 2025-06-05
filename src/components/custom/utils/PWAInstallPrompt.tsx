
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Zap, Wifi } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-sm">
      <Card className="shadow-lg border-primary">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Installer Foodie</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Installez notre app pour une expérience optimale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center text-center">
              <Zap className="w-4 h-4 text-primary mb-1" />
              <span>Plus rapide</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Wifi className="w-4 h-4 text-primary mb-1" />
              <span>Hors ligne</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Download className="w-4 h-4 text-primary mb-1" />
              <span>Notifications</span>
            </div>
          </div>
          <Button 
            onClick={handleInstall} 
            className="w-full"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Installer l'app
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
