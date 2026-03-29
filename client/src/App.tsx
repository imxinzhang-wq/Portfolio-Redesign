import { Router, Switch, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:id" component={CaseStudy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router hook={useHashLocation}>
        <AppRoutes />
      </Router>
    </TooltipProvider>
  );
}

export default App;
