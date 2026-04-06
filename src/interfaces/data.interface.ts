export interface Task {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

export interface BarData {
  day: string;
  value: number;
}

export interface PieData {
  label: string;
  percent: number;
  color: string;
}
