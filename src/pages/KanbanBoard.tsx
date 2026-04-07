import { useContext, useState } from "react";

import { AddTaskModal } from "@/components/custom/AddTaskModal";
import { KanbanColumn } from "@/components/custom/KanbanColumn";
import { TasksContext } from "@/context/TasksContext";
import { UpdateTaskModal } from "@/components/custom/UpdateTaskModal";

export const KanbanBoard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(0);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { tasks, deleteTask } = useContext(TasksContext);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Board</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Organize and track your tasks
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto mr-4">
        <KanbanColumn
          title="To Do"
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
    </>
  );
};
