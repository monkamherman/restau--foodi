
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, X } from 'lucide-react';
import { useServiceWorker } from '@/hooks/usePWA';

const PWAUpdateNotification: React.FC = () => {
  const { needsRefresh, updateApp } = useServiceWorker();

  if (!needsRefresh) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-blue-500 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg text-blue-900">Mise à jour disponible</CardTitle>
            </div>
          </div>
          <CardDescription className="text-blue-700">
            Une nouvelle version de l'application est disponible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={updateApp} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Mettre à jour
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAUpdateNotification;
