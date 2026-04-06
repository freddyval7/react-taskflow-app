import { Plus, Inbox } from "lucide-react";
import { Button } from "../ui/button";
import { TaskCard } from "./TaskCard";

interface Task {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  accentColor: string;
  onAddTask?: () => void;
  onDeleteTask?: (id: number) => void;
}

export const KanbanColumn = ({
  title,
  tasks,
  accentColor,
  onAddTask,
  onDeleteTask,
}: KanbanColumnProps) => {
  return (
    <div className="flex flex-col bg-muted/50 rounded-2xl p-4 min-w-70 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${accentColor}`} />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onAddTask}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Inbox className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-xs">No tasks yet</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              priority={task.priority}
              dueDate={task.dueDate}
              onDelete={() => onDeleteTask?.(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
