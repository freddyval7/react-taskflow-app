import { useContext, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import { AddTaskModal } from "@/components/custom/AddTaskModal";
import { KanbanColumn } from "@/components/custom/KanbanColumn";
import { TasksContext } from "@/context/TasksContext";
import { UpdateTaskModal } from "@/components/custom/UpdateTaskModal";
import type { Task } from "@/interfaces/data.interface";

export const KanbanBoard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { tasks, deleteTask, updateTaskState } = useContext(TasksContext);
  const [, setActiveTask] = useState<Task | null>(null);

  const handleDragEnd = (event: any) => {
    if (event.canceled) return;

    const { source, target } = event.operation;
    if (!target) return;

    const taskId = Number(source.id);
    const newState = target.id as "Todo" | "In Progress" | "Done";
    const task = tasks.find((t) => t.id === taskId);

    if (task && task.state !== newState) {
      updateTaskState(taskId, newState);
    }

    setActiveTask(null);
  };

  const handleDragStart = (event: any) => {
    const task = tasks.find((t) => t.id === Number(event.source.id));
    setActiveTask(task || null);
  };

  return (
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Board</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Organize and track your tasks
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto mr-4">
        <KanbanColumn
          title="Todo"
          tasks={tasks.filter((t) => t.state === "Todo")}
          accentColor="bg-sky-600"
          onAddTask={() => setModalOpen(true)}
          onUpdateTask={(id) => {
            setTaskToEdit(id);
            setUpdateModalOpen(true);
          }}
          onDeleteTask={(id) => deleteTask(id)}
        />
        <KanbanColumn
          title="In Progress"
          tasks={tasks.filter((t) => t.state === "In Progress")}
          accentColor="bg-amber-600"
          onAddTask={() => setModalOpen(true)}
          onUpdateTask={(id) => {
            setTaskToEdit(id);
            setUpdateModalOpen(true);
          }}
          onDeleteTask={(id) => deleteTask(id)}
        />
        <KanbanColumn
          title="Done"
          tasks={tasks.filter((t) => t.state === "Done")}
          accentColor="bg-emerald-600"
          onAddTask={() => setModalOpen(true)}
          onUpdateTask={(id) => {
            setTaskToEdit(id);
            setUpdateModalOpen(true);
          }}
          onDeleteTask={(id) => deleteTask(id)}
        />
      </div>

      <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <UpdateTaskModal
        id={taskToEdit}
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      />
    </DragDropProvider>
  );
};
