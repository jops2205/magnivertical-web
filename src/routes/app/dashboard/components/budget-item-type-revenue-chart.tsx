import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useGetBudgetItemTypeRevenue } from "@/api/hooks/metrics/use-get-budget-item-type-revenue";
import type { BudgetItemType } from "@/api/schemas/budget-schema";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getBudgetItemType } from "@/utils/budget-item-type";
import { formatCurrency } from "@/utils/funcs/formatters";

type ChartData = {
	type: BudgetItemType;
	revenue: number;
};

const chartConfig: ChartConfig = {
	revenue: {
		label: "Receita",
		color: "var(--chart-2)",
	},
};

export function BudgetItemTypeRevenueChart() {
	const { items, isFetching } = useGetBudgetItemTypeRevenue();

	const chartData: ChartData[] = Object.entries(items).map(
		([type, { revenue }]) => ({
			type: type as BudgetItemType,
			revenue,
		}),
	);

	return (
		<>
			{isFetching && <Skeleton className="h-124 md:w-1/2" />}
			{!isFetching && (
				<Card className="pb-0 md:w-1/2 md:pb-6">
					<CardHeader>
						<CardTitle>Receita por tipo de artigo</CardTitle>
						<CardDescription>
							Obtenha uma visão clara da receita por tipo de artigo.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea orientation="horizontal">
							<ChartContainer
								config={chartConfig}
								className="h-96 min-w-200 pb-6 md:w-full md:min-w-0 md:pb-0">
								<BarChart
									data={chartData}
									margin={{ top: 30 }}
									accessibilityLayer>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="type"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(value) => getBudgetItemType(value)}
									/>
									<Bar dataKey="revenue" fill="var(--color-revenue)" radius={8}>
										<LabelList
											position="top"
											offset={10}
											fontSize={12}
											className="fill-foreground"
											formatter={(value: number) => formatCurrency(value)}
										/>
									</Bar>
								</BarChart>
							</ChartContainer>
						</ScrollArea>
					</CardContent>
				</Card>
			)}
		</>
	);
}
