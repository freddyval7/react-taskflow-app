import { useState } from "react";

import { AddTaskModal } from "@/components/custom/AddTaskModal";
import { KanbanColumn } from "@/components/custom/KanbanColumn";

const initialTasks = {
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

export const KanbanBoard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Board</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Organize and track your tasks
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto">
        <KanbanColumn
          title="To Do"
          tasks={initialTasks.todo}
          accentColor="bg-column-todo"
          onAddTask={() => setModalOpen(true)}
          onDeleteTask={(id) => console.log("Delete", id)}
        />
        <KanbanColumn
          title="In Progress"
          tasks={initialTasks.inProgress}
          accentColor="bg-column-progress"
          onAddTask={() => setModalOpen(true)}
          onDeleteTask={(id) => console.log("Delete", id)}
        />
        <KanbanColumn
          title="Done"
          tasks={initialTasks.done}
          accentColor="bg-column-done"
          onAddTask={() => setModalOpen(true)}
          onDeleteTask={(id) => console.log("Delete", id)}
        />
      </div>

      <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
