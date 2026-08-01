import { useState } from "react";
import { Router, Switch, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Toaster } from "@/components/ui/toaster";
import LoadingScreen from "@/components/LoadingScreen";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteReadyContext } from "@/lib/site-ready";
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
  /*
    Lives here rather than inside the loader because the page underneath needs
    it: the headline's clip gets one playthrough and must not spend it behind
    the curtain. The loader owns when it happens; everything else owns what to
    do about it.
  */
  const [ready, setReady] = useState(false);

  return (
    <TooltipProvider>
      <SiteReadyContext.Provider value={ready}>
        {/*
          Outside the Router on purpose: this covers the first paint of the
          session, not every navigation. Route changes are client-side and
          already instant, so re-running it there would be a curtain drawn
          over nothing.
        */}
        <LoadingScreen onReady={() => setReady(true)} />
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRoutes />
        </Router>
      </SiteReadyContext.Provider>
    </TooltipProvider>
  );
}

export default App;
