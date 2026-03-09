import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";
import { useGetCustomerTypeRevenue } from "@/api/hooks/metrics/use-get-customer-type-revenue";
import type { CustomerType } from "@/api/schemas/customer-schema";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getCustomerType } from "@/utils/customer-type";
import { formatCurrency } from "@/utils/funcs/formatters";

type ChartData = {
	type: CustomerType;
	revenue: number;
	percentage: number;
};

const chartConfig: ChartConfig = {
	revenue: {
		label: "Receita",
		color: "var(--chart-2)",
	},
	percentage: {
		label: "Percentual",
		color: "var(--chart-1)",
	},
};

export function CustomerTypeRevenueChart() {
	const { business, individual, isFetching } = useGetCustomerTypeRevenue();

	const chartData: ChartData[] = [
		{
			type: "BUSINESS",
			revenue: business.revenue,
			percentage: Math.ceil(business.percentage * 100),
		},
		{
			type: "INDIVIDUAL",
			revenue: individual.revenue,
			percentage: Math.ceil(individual.percentage * 100),
		},
	];

	return (
		<>
			{isFetching && <Skeleton className="h-124 md:w-1/2" />}
			{!isFetching && (
				<Card className="md:w-1/2">
					<CardHeader>
						<CardTitle>Receita por tipo de cliente</CardTitle>
						<CardDescription>
							Comparação da receita gerada por clientes empresariais e
							particulares.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-96 w-full">
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
									tickFormatter={(value) => getCustomerType(value)}
								/>
								<YAxis yAxisId="left" hide />
								<YAxis yAxisId="right" orientation="right" hide />
								<Bar
									dataKey="revenue"
									yAxisId="left"
									fill="var(--color-revenue)"
									radius={8}>
									<LabelList
										position="top"
										offset={10}
										fontSize={12}
										className="fill-foreground"
										formatter={(value: number) => formatCurrency(value)}
									/>
								</Bar>
								<Bar
									dataKey="percentage"
									yAxisId="right"
									fill="var(--color-percentage)"
									radius={8}>
									<LabelList
										position="top"
										offset={10}
										fontSize={12}
										className="fill-foreground"
										formatter={(value: number) => `${value}%`}
									/>
								</Bar>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			)}
		</>
	);
}
