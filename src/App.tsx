import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/i18n/LangContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Module from "./pages/Module";
import HRLayout from "./components/HRLayout";
import Dashboard from "./pages/hr/Dashboard";
import Employees from "./pages/hr/Employees";
import Leaves from "./pages/hr/Leaves";
import Missions from "./pages/hr/Missions";
import Presence from "./pages/hr/Presence";
import AccessHistory from "./pages/hr/AccessHistory";
import Badges from "./pages/hr/Badges";
import ITGroup from "./pages/ITGroup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LangProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hr" element={<HRLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="missions" element={<Missions />} />
              <Route path="presence" element={<Presence />} />
              <Route path="access-history" element={<AccessHistory />} />
              <Route path="badges" element={<Badges />} />
            </Route>
            <Route path="/security" element={<Module kind="security" />} />
            <Route path="/it" element={<ITGroup />} />
            <Route path="/it-group" element={<ITGroup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
