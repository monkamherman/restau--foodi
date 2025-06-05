
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/routes/new-router";
import { RouterProvider } from "react-router-dom";
import ScrollProgressBar from '@/components/custom/utils/ScrollProgress';
import OfflineAlert from '@/components/custom/utils/OfflineAlert';
import PerformanceMonitor from '@/components/custom/utils/PerformanceMonitor';

// Configuration optimisée du QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: (failureCount, error: any) => {
        // Ne pas retry sur les erreurs 404
        if (error?.status === 404) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

// Préchargement des routes critiques
const preloadCriticalRoutes = () => {
  // Précharger les composants critiques
  import('@/pages/home/Home');
  import('@/pages/menu/Menu');
  import('@/components/Header');
  import('@/components/Footer');
};

// Démarrer le préchargement après le premier rendu
setTimeout(preloadCriticalRoutes, 100);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="restaurant-theme">
      <TooltipProvider>
        <RouterProvider router={Router} />
        <ScrollProgressBar />
        <Toaster />
        <Sonner />
        <OfflineAlert />
        <PerformanceMonitor />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
