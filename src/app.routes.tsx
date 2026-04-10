import { createHashRouter } from "react-router";
import { Layout } from "./layouts/Layout";
import { KanbanBoard } from "./pages/KanbanBoard";
import { Stats } from "./pages/stats/Stats";
import { SettingsPage } from "./pages/Settings";
import { NotFound } from "./pages/NotFoundPage";

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <KanbanBoard />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
