import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Get the current hostname
const currentHostname = window.location.hostname;

// Set the appropriate client ID based on the environment
const GOOGLE_CLIENT_ID = currentHostname.includes('lovable.app')
  ? "939965943981-1teum3knhv5ocs40sn53209s97i5hb9m.apps.googleusercontent.com" // Production/Preview client ID
  : "939965943981-k2aqc7f4qqm4ld5oa3qj0l2uh5g7vu0q.apps.googleusercontent.com"; // Development client ID

const App = () => (
  <GoogleOAuthProvider 
    clientId={GOOGLE_CLIENT_ID}
    onScriptLoadError={() => console.error('Google OAuth script failed to load')}
    onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
