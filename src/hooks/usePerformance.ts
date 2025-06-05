
import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface PerformanceMetrics {
  memory?: any;
  connection?: any;
}

export const usePerformance = () => {
  const queryClient = useQueryClient();

  // Préchargement intelligent des données
  const prefetchData = useCallback((queryKey: string[], queryFn: () => Promise<any>) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  }, [queryClient]);

  // Nettoyage automatique du cache
  const clearOldCache = useCallback(() => {
    queryClient.clear();
  }, [queryClient]);

  // Optimisation basée sur les métriques de performance
  const optimizeBasedOnMetrics = useCallback(() => {
    const metrics: PerformanceMetrics = {
      memory: (performance as any).memory,
      connection: (navigator as any).connection,
    };

    // Si la mémoire est faible, nettoyer le cache plus agressivement
    if (metrics.memory && metrics.memory.usedJSHeapSize > 50000000) { // 50MB
      queryClient.clear();
      console.log('Cache cleared due to high memory usage');
    }

    // Si la connexion est lente, réduire les requêtes automatiques
    if (metrics.connection && metrics.connection.effectiveType === 'slow-2g') {
      // Désactiver les refetch automatiques
      queryClient.setDefaultOptions({
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      });
    }

    return metrics;
  }, [queryClient]);

  // Mesurer les performances des composants
  const measureComponentPerformance = useCallback((componentName: string) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const duration = end - start;
      
      if (duration > 16) { // Plus de 16ms (60fps)
        console.warn(`Component ${componentName} took ${duration.toFixed(2)}ms to render`);
      }
    };
  }, []);

  useEffect(() => {
    // Optimisation initiale
    optimizeBasedOnMetrics();

    // Surveillance périodique
    const interval = setInterval(optimizeBasedOnMetrics, 60000); // Chaque minute

    return () => clearInterval(interval);
  }, [optimizeBasedOnMetrics]);

  return {
    prefetchData,
    clearOldCache,
    optimizeBasedOnMetrics,
    measureComponentPerformance,
  };
};

// Hook pour la gestion intelligente des images
export const useImagePreloader = () => {
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (srcs: string[]) => {
    try {
      await Promise.all(srcs.map(preloadImage));
    } catch (error) {
      console.warn('Failed to preload some images:', error);
    }
  }, [preloadImage]);

  return { preloadImage, preloadImages };
};
