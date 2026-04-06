import { RouterProvider } from "react-router";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appRouter } from "./app.routes";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <RouterProvider router={appRouter} />
  </TooltipProvider>
);

export default App;
