export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  state: "Todo" | "In Progress" | "Done";
}

export interface BarData {
  day: string;
  value: number;
}

export interface PieData {
  label: string;
  percent: number;
  fill: string;
}
