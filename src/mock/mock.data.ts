import type { BarData, PieData, Task } from "@/interfaces/data.interface";

// Mock data for the Kanban board
export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design UI",
    priority: "High" as const,
    dueDate: "2025-04-10",
    state: "Todo" as const,
  },
  {
    id: 2,
    title: "Write documentation",
    priority: "Medium" as const,
    dueDate: "2025-04-12",
    state: "Todo" as const,
  },
  {
    id: 3,
    title: "Implement drag & drop",
    priority: "High" as const,
    dueDate: "2025-04-08",
    state: "In Progress" as const,
  },
  {
    id: 4,
    title: "Setup project",
    priority: "Low" as const,
    dueDate: "2025-04-05",
    state: "Done" as const,
  },
];

// Mock data for the Stats page
export const barData: BarData[] = [
  { day: "Mon", value: 30 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 50 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 40 },
  { day: "Sat", value: 60 },
  { day: "Sun", value: 20 },
];

export const pieData: PieData[] = [
  { label: "High", percent: 50, fill: "var(--color-priority-high)" },
  { label: "Medium", percent: 25, fill: "var(--color-priority-medium)" },
  { label: "Low", percent: 25, fill: "var(--color-priority-low)" },
];
