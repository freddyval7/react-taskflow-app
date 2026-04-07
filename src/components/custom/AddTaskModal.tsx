import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useContext } from "react";
import { TasksContext } from "@/context/TasksContext";
import { generateID } from "@/utils/functions";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  description: z.string().min(8, "Description is too short"),
  priority: z.enum(["High", "Medium", "Low"]),
  dueDate: z.string(),
  state: z.enum(["Todo", "In Progress", "Done"]),
});

export const AddTaskModal = ({ open, onClose }: AddTaskModalProps) => {
  const { addTask } = useContext(TasksContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      dueDate: new Date().toISOString().split("T")[0],
      state: "Todo",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const newTask = {
      ...data,
      id: +generateID(),
    };

    console.log(newTask);
    addTask(newTask);
    onClose();
  };

  if (!open) return null;

  return (
    <form
      className="fixed inset-0 z-50 flex items-center justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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

        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel className="text-sm font-medium text-card-foreground mb-1.5 block">
                  Title
                </FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter task title..."
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel className="text-sm font-medium text-card-foreground mb-1.5 block">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe the task..."
                  className="resize-none"
                  rows={3}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="priority"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-sm font-medium text-card-foreground mb-1.5 block">
                  Priority
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="state"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-sm font-medium text-card-foreground mb-1.5 block">
                  State
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="dueDate"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-sm font-medium text-card-foreground mb-1.5 block">
                  Due Date
                </FieldLabel>
                <Input type="date" {...field} />
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex gap-3 mt-6">
          <Field orientation={"horizontal"}>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" type="submit">
              Add Task
            </Button>
          </Field>
        </div>
      </div>
    </form>
  );
};
