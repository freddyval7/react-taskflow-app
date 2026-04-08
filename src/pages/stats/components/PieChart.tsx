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
import type { PieData } from "@/interfaces/data.interface";

const pieData: PieData[] = [
  { label: "high", percent: 50, fill: "var(--color-priority-high)" },
  { label: "medium", percent: 25, fill: "var(--color-priority-medium)" },
  { label: "low", percent: 25, fill: "var(--color-priority-low)" },
];

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

export function PieChartApp() {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart responsive>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
