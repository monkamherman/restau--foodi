
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ScrollProgressBar from '@/components/custom/utils/ScrollProgress';
import OfflineAlert from '@/components/custom/utils/OfflineAlert';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={Router}>
      <ThemeProvider defaultTheme="light" storageKey="restaurant-theme">
        <AuthProvider>
          <TooltipProvider>
            <ScrollProgressBar />
            <Toaster />
            <Sonner />
            <OfflineAlert />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </RouterProvider>
  </QueryClientProvider>
);

export default App;
