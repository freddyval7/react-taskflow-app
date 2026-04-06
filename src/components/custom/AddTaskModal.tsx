import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddTaskModal = ({ open, onClose }: AddTaskModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Add New Task
          </h2>
          <Button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">
              Title
            </label>
            <Input placeholder="Enter task title..." />
          </div>

          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">
              Description
            </label>
            <Textarea
              placeholder="Describe the task..."
              className="resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">
              Priority
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">
              Due Date
            </label>
            <Input type="date" />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              console.log("Add task");
              onClose();
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};
