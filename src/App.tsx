import { RouterProvider } from "react-router";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appRouter } from "./app.routes";
import { TasksProvider } from "./context/TasksContext";

const App = () => (
  <TooltipProvider>
    <TasksProvider>
      <Sonner />
      <RouterProvider router={appRouter} />
    </TasksProvider>
  </TooltipProvider>
);

export default App;
