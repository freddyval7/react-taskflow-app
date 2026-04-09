import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Task } from "@/interfaces/data.interface";
import {
  parseISO,
  subDays,
  format,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
} from "date-fns";
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Tasks completed",
  },
} satisfies ChartConfig;

interface BarChartProps {
  completedTasks: Task[];
}

const daysInterval = eachDayOfInterval({
  start: subDays(new Date(), 6),
  end: new Date(),
});

export function BarChartApp({ completedTasks }: BarChartProps) {
  // Calculamos la productividad promedio en los últimos 7 días
  const last7DaysTasks = useMemo(() => {
    return completedTasks.filter((task) => {
      // 1. Convertimos la fecha de la tarea de forma segura
      // parseISO es ideal para el formato "yyyy-MM-dd"
      const taskDate = startOfDay(parseISO(task.dueDate));

      // 2. Obtenemos el inicio del día de hace 7 días
      const sevenDaysAgo = startOfDay(subDays(new Date(), 7));

      // 3. Comparamos
      return taskDate >= sevenDaysAgo;
    });
  }, [completedTasks]);

  const last7DaysTasksProductivity = useMemo(() => {
    const totalTasks = last7DaysTasks.length;

    return ((totalTasks / 7) * 100).toFixed(2);
  }, [last7DaysTasks]);

  const barData = daysInterval.map((dayDate) => {
    // Contamos cuántas tareas coinciden con este día específico
    const totalTasks = completedTasks.filter((task) => {
      const taskDate = parseISO(task.dueDate);
      return isSameDay(taskDate, dayDate) && task.state === "Done";
    }).length;

    return {
      // Usamos el nombre del día como etiqueta (ej: "lun")
      day: format(dayDate, "eee"),
      count: totalTasks,
    };
  });

  return (
    <Card>
      <CardContent className="flex-1 pb-0 gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square 2xl:aspect-video"
        >
          <BarChart accessibilityLayer data={barData} responsive>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => `${value} Tasks Completed`}
            />
            <Bar dataKey="count" fill="var(--color-primary)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by {last7DaysTasksProductivity}% this last 7 days{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total tasks completed for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
