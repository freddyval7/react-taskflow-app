import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import type { Task } from "@/interfaces/data.interface";
import { initialTasks } from "@/mock/mock.data";

const STORAGE_KEY = "taskflow_tasks";

interface TasksContext {
  // State
  tasks: Task[];
  tasksCount: number;

  //Methods
  addTask: (task: Task) => void;
  updateTask: (id: number, task: Task) => void;
  updateTaskPriority: (id: number, priority: "High" | "Medium" | "Low") => void;
  moveTask: (id: number, fromColumn: string, toColumn: string) => void;
  deleteTask: (id: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext({} as TasksContext);

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : initialTasks;
};

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>(getTasksFromLocalStorage());

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id: number, task: Task) => {
    setTasks(tasks.map((t) => (t.id === id ? task : t)));
  };

  const updateTaskPriority = (
    id: number,
    priority: "High" | "Medium" | "Low",
  ) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, priority } : t)));
  };

  const moveTask = (id: number, fromColumn: string, toColumn: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, fromColumn, toColumn } : t)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        tasksCount: tasks.length,
        addTask,
        updateTask,
        updateTaskPriority,
        moveTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
