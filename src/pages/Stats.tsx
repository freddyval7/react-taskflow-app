import { TrendingUp, CheckCircle2, Clock, Percent } from "lucide-react";

import { barData, pieData } from "@/mock/mock.data";

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
        <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your productivity and progress
        </p>
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
          <div className="flex items-end gap-3 h-40">
            {barData.map((d) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-primary/80 rounded-t-md transition-all"
                  style={{ height: `${d.value}%` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
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
            <div className="relative w-32 h-32 rounded-full border-12 border-priority-high flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                  hsl(0 72% 51%) 0% 50%,
                  hsl(38 92% 50%) 50% 75%,
                  hsl(142 71% 45%) 75% 100%
                )`,
                }}
              />
              <div className="relative w-20 h-20 rounded-full bg-card" />
            </div>
            <div className="space-y-3">
              {pieData.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${d.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {d.label}
                  </span>
                  <span className="text-xs font-medium text-card-foreground">
                    {d.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
