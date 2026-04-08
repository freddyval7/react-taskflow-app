import { TrendingUp, CheckCircle2, Clock, Percent } from "lucide-react";

import { BarChartApp } from "./components/BarChart";
import { PieChartApp } from "./components/PieChart";

const kpis = [
  {
    label: "Total Tasks",
    value: "4",
    icon: TrendingUp,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Completed",
    value: "1",
    icon: CheckCircle2,
    color: "bg-priority-low/10 text-priority-low",
  },
  {
    label: "Pending",
    value: "3",
    icon: Clock,
    color: "bg-priority-medium/10 text-priority-medium",
  },
  {
    label: "Productivity",
    value: "25%",
    icon: Percent,
    color: "bg-accent text-accent-foreground",
  },
];

export const Stats = () => {
  return (
    <>
      <div className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your productivity and progress
          </p>
        </div>
        <div>
          
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
