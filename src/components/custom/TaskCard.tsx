import { Trash2, Calendar } from "lucide-react";

interface TaskCardProps {
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  onDelete?: () => void;
}

const priorityConfig = {
  High: "bg-priority-high/10 text-priority-high",
  Medium: "bg-priority-medium/10 text-priority-medium",
  Low: "bg-priority-low/10 text-priority-low",
};

export const TaskCard = ({
  title,
  priority,
  dueDate,
  onDelete,
}: TaskCardProps) => {
  return (
    <div className="group bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-card-foreground leading-snug">
          {title}
        </h4>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityConfig[priority]}`}
        >
          {priority}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {dueDate}
        </span>
      </div>
    </div>
  );
};
