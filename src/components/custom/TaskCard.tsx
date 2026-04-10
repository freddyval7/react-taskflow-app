import { Trash2, Calendar, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDraggable } from "@dnd-kit/react";
import { PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";

interface TaskCardProps {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const priorityConfig = {
  High: "bg-priority-high/10 text-priority-high",
  Medium: "bg-priority-medium/10 text-priority-medium",
  Low: "bg-priority-low/10 text-priority-low",
};

export const TaskCard = ({
  id,
  title,
  priority,
  dueDate,
  onUpdate,
  onDelete,
}: TaskCardProps) => {
  const { ref } = useDraggable({
    id: String(id),
    // Datos adicionales que quieras pasar al evento onDragEnd
    data: { id, title, priority, dueDate },
    // Sensors para activar el drag en móviles
    sensors: [
      PointerSensor.configure({
        activationConstraints: [
          // Start dragging after moving 5px
          new PointerActivationConstraints.Distance({ value: 5 }),
          // Or after holding for 250ms with 5px tolerance
          new PointerActivationConstraints.Delay({ value: 250, tolerance: 5 }),
        ],
      }),
    ],
  });

  return (
    <div
      ref={ref}
      className="group bg-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer touch-none
      transform-gpu duration-300 hover:scale-105 hover:border-primary/50"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-card-foreground leading-snug">
          {title}
        </h4>
        <div className="flex items-center gap-1">
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-ring/10 text-muted-foreground hover:text-ring"
            onClick={onUpdate}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-3.5 h-3.5" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to delete this task?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
