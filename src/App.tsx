
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import ScrollProgressBar from '@/components/custom/utils/ScrollProgress';
import OfflineAlert from '@/components/custom/utils/OfflineAlert';

const queryClient = new QueryClient();

// We need to use a different approach to avoid router context issues
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="restaurant-theme">
      <TooltipProvider>
        {/* AuthProvider is now rendered by the router itself */}
        <RouterProvider router={Router} />
        <ScrollProgressBar />
        <Toaster />
        <Sonner />
        <OfflineAlert />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
