import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Task } from "@/interfaces/data.interface";
import { useMemo } from "react";

// {id: 1, title: "Task 1", priority: "High", dueDate: "2026-04-10", state: "Done"},

// const pieData: PieData[] = [
//   { label: "high", percent: 50, fill: "var(--color-priority-high)" },
//   { label: "medium", percent: 25, fill: "var(--color-priority-medium)" },
//   { label: "low", percent: 25, fill: "var(--color-priority-low)" },
// ];

const chartConfig = {
  high: {
    label: "High",
    color: "var(--color-priority-high)",
  },
  medium: {
    label: "Medium",
    color: "var(--color-priority-medium)",
  },
  low: {
    label: "Low",
    color: "var(--color-priority-low)",
  },
} satisfies ChartConfig;

interface PieChartProps {
  tasks: Task[];
}

export function PieChartApp({ tasks }: PieChartProps) {
  const pieData = useMemo(() => {
    if (tasks.length === 0) return [];

    const counts = tasks.reduce(
      (acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return [
      {
        label: "high",
        percent: counts["High"] || 0,
        fill: "var(--color-priority-high)",
      },
      {
        label: "medium",
        percent: counts["Medium"] || 0,
        fill: "var(--color-priority-medium)",
      },
      {
        label: "low",
        percent: counts["Low"] || 0,
        fill: "var(--color-priority-low)",
      },
    ].map((item) => ({
      ...item,
      percent: Number(((item.percent / tasks.length) * 100).toFixed(0)), // Convertir a porcentaje la cantidad de tareas
    }));
  }, [tasks]);

  return (
    <Card className="w-full">
      <CardContent className="flex-1 pb-0 gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square 2xl:aspect-video"
        >
          <PieChart responsive>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => (
                    <>
                      <span className="font-bold">{value}%</span>
                    </>
                  )}
                />
              }
            />
            <Pie
              data={pieData}
              dataKey="percent"
              nameKey="label"
              innerRadius={25}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="label" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm items-start">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total tasks by priority levels
        </div>
      </CardFooter>
    </Card>
  );
}
