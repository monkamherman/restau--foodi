
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/routes/router";
import { RouterProvider } from "react-router-dom";
import ScrollProgressBar from '@/components/custom/utils/ScrollProgress';
import OfflineAlert from '@/components/custom/utils/OfflineAlert';
import { AuthProvider } from "@/hooks/auth";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <RouterProvider router={Router} />
        <ThemeProvider defaultTheme="light" storageKey="restaurant-theme">
          <TooltipProvider>
            <ScrollProgressBar />
            <Toaster />
            <Sonner />
            <OfflineAlert />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
