
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, Zap, HardDrive } from 'lucide-react';

interface PerformanceData {
  fps: number;
  memory: number;
  loadTime: number;
  connectionType: string;
}

const PerformanceMonitor: React.FC<{ isVisible?: boolean }> = ({ 
  isVisible = process.env.NODE_ENV === 'development' 
}) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 0,
    memory: 0,
    loadTime: 0,
    connectionType: 'unknown',
  });

  useEffect(() => {
    if (!isVisible) return;

    let frameCount = 0;
    let lastTime = Date.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setPerformanceData(prev => ({
          ...prev,
          fps,
          memory: (performance as any).memory?.usedJSHeapSize 
            ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) 
            : 0,
          loadTime: (performance as any).timing 
            ? (performance as any).timing.loadEventEnd - (performance as any).timing.navigationStart
            : 0,
          connectionType: (navigator as any).connection?.effectiveType || 'unknown',
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const getFPSColor = (fps: number): "default" | "destructive" | "secondary" | "outline" => {
    if (fps >= 50) return 'default';
    if (fps >= 30) return 'secondary';
    return 'destructive';
  };

  const getMemoryColor = (memory: number): "default" | "destructive" | "secondary" | "outline" => {
    if (memory < 50) return 'default';
    if (memory < 100) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs">
      <Card className="bg-white/90 backdrop-blur shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              <span className="text-xs">FPS:</span>
            </div>
            <Badge variant={getFPSColor(performanceData.fps)}>{performanceData.fps}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HardDrive className="w-3 h-3 mr-1" />
              <span className="text-xs">Memory:</span>
            </div>
            <Badge variant={getMemoryColor(performanceData.memory)}>
              {performanceData.memory}MB
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wifi className="w-3 h-3 mr-1" />
              <span className="text-xs">Connection:</span>
            </div>
            <Badge variant="outline">{performanceData.connectionType}</Badge>
          </div>
          
          {performanceData.loadTime > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-xs">Load Time:</span>
              <Badge variant="outline">{Math.round(performanceData.loadTime)}ms</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
