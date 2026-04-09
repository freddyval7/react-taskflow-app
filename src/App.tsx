import { RouterProvider } from "react-router";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appRouter } from "./app.routes";
import { TasksProvider } from "./context/TasksContext";
import { ThemeProvider } from "./components/theme-provider";

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <TasksProvider>
        <Sonner />
        <RouterProvider router={appRouter} />
      </TasksProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
