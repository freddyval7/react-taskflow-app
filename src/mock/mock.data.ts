import type { BarData, PieData, Task } from "@/interfaces/data.interface";

// Mock data for the Kanban board
export const initialTasks: Record<string, Task[]> = {
  todo: [
    {
      id: 1,
      title: "Design UI",
      priority: "High" as const,
      dueDate: "2025-04-10",
    },
    {
      id: 2,
      title: "Write documentation",
      priority: "Medium" as const,
      dueDate: "2025-04-12",
    },
  ],
  inProgress: [
    {
      id: 3,
      title: "Implement drag & drop",
      priority: "High" as const,
      dueDate: "2025-04-08",
    },
  ],
  done: [
    {
      id: 4,
      title: "Setup project",
      priority: "Low" as const,
      dueDate: "2025-04-05",
    },
  ],
};

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
  { label: "High", percent: 50, color: "bg-priority-high" },
  { label: "Medium", percent: 25, color: "bg-priority-medium" },
  { label: "Low", percent: 25, color: "bg-priority-low" },
];
