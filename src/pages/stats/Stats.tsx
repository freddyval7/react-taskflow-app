import { useSearchParams } from "react-router";
import { TasksContext } from "@/context/TasksContext";
import { TrendingUp, CheckCircle2, Clock, Percent } from "lucide-react";

import { BarChartApp } from "./components/BarChart";
import { PieChartApp } from "./components/PieChart";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/custom/DatePicker";
import { useContext, useState } from "react";
import type { Task } from "@/interfaces/data.interface";
import { addDays, format } from "date-fns";
import { getSafeDate } from "@/utils/functions";

export const Stats = () => {
  const { tasks } = useContext(TasksContext);
  const [searchParams] = useSearchParams();
  const [actualTasks, setActualTasks] = useState<Task[]>(tasks);

  const dateFrom = getSafeDate("from", new Date(), searchParams);
  const dateTo = getSafeDate("to", addDays(dateFrom, 7), searchParams);

  const handleDateChange = () => {
    // Como dateFrom y dateTo ya pasaron por getSafeDate,
    // format() no lanzará el RangeError.
    const startStr = format(dateFrom, "yyyy-MM-dd");
    const endStr = format(dateTo, "yyyy-MM-dd");

    const filtered = tasks.filter((task) => {
      // Comparación directa de strings: "2026-04-10" >= "2026-01-01"
      return task.dueDate >= startStr && task.dueDate <= endStr;
    });

    console.log(filtered);

    setActualTasks(filtered);
  };

  const actualTasksCompleted = actualTasks.filter(
    (task) => task.state === "Done",
  );

  const actualTasksPending = actualTasks.filter(
    (task) => task.state !== "Done",
  );

  const kpis = [
    {
      label: "Total Tasks",
      value: actualTasks.length,
      icon: TrendingUp,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Completed",
      value: actualTasksCompleted.length,
      icon: CheckCircle2,
      color: "bg-priority-low/10 text-priority-low",
    },
    {
      label: "Pending",
      value: actualTasksPending.length,
      icon: Clock,
      color: "bg-priority-medium/10 text-priority-medium",
    },
    {
      label: "Productivity",
      value: ((actualTasksCompleted.length / actualTasks.length) * 100).toFixed(
        0,
      ),
      icon: Percent,
      color: "bg-accent text-accent-foreground",
    },
  ];

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your productivity and progress
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex md:flex-col gap-2 items-center justify-between md:items-start">
            <DatePickerWithRange />
          </div>
          <div className="flex flex-col gap-4 items-center justify-between">
            <span></span>
            <Button
              onClick={handleDateChange}
              className="bg-primary text-primary-foreground"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${kpi.color}`}
            >
              <kpi.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              {kpi.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar chart placeholder */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-1">
            Tasks completed per day
          </h3>
          <p className="text-xs text-muted-foreground mb-6">Last 7 days</p>
          <BarChartApp />
        </div>

        {/* Pie chart placeholder */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-1">
            Tasks by priority
          </h3>
          <p className="text-xs text-muted-foreground mb-6">
            Distribution overview
          </p>
          <div className="flex items-center gap-8">
            <PieChartApp />
          </div>
        </div>
      </div>
    </>
  );
};
