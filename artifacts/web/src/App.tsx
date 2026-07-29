import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Landing from "@/pages/landing";
import Dao from "@/pages/dao";
import Cyber from "@/pages/cyber";
import Eo from "@/pages/eo";
import Sobre from "@/pages/sobre";
import Analise from "@/pages/analise";
import Cotacao from "@/pages/cotacao";
import Confirmacao from "@/pages/confirmacao";
import Portal from "@/pages/portal";
import PortalDashboard from "@/pages/portal-dashboard";
import NotFound from "@/pages/not-found";

// Admin pages
import AdminSetup from "@/pages/admin/setup";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/index";
import AdminClientes from "@/pages/admin/clientes";
import AdminApolices from "@/pages/admin/apolices";
import AdminProdutos from "@/pages/admin/produtos";
import AdminUsuarios from "@/pages/admin/usuarios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dao" component={Dao} />
      <Route path="/cyber" component={Cyber} />
      <Route path="/eo" component={Eo} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/analise" component={Analise} />
      <Route path="/cotacao" component={Cotacao} />
      <Route path="/confirmacao" component={Confirmacao} />
      <Route path="/portal" component={Portal} />
      <Route path="/portal/dashboard" component={PortalDashboard} />
      {/* Admin */}
      <Route path="/admin/setup" component={AdminSetup} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/clientes" component={AdminClientes} />
      <Route path="/admin/apolices" component={AdminApolices} />
      <Route path="/admin/produtos" component={AdminProdutos} />
      <Route path="/admin/usuarios" component={AdminUsuarios} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
