import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./lib/i18n";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import MainApp from "./pages/MainApp";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Public */}
          <Route path="/" element={<Landing />} />
          
          {/* Sign In Page - Public */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* Main Application - Protected */}
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            } 
          />
          
          {/* Legacy route redirect for backward compatibility */}
          <Route path="/index" element={<MainApp />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
