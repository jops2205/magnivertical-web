import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useGetValueDistribution } from "@/api/hooks/metrics/use-get-value-distribution";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/funcs/formatters";

type ChartData = {
	range: string;
	projectCount: number;
	budgetSent: number;
	budgetApproved: number;
	approvalPercentage: number;
};

const chartConfig: ChartConfig = {
	projectCount: {
		label: "Obras realizadas",
		color: "var(--chart-5)",
	},
	budgetSent: {
		label: "Orçamentos enviados",
		color: "var(--chart-3)",
	},
	budgetApproved: {
		label: "Orçamentos adjudicados",
		color: "var(--chart-2)",
	},
	approvalPercentage: {
		label: "Percentual de adjudicação",
		color: "var(--chart-1)",
	},
};

export function ValueDistributionChart() {
	const { ranges, isFetching } = useGetValueDistribution();

	const chartData: ChartData[] = ranges.map(
		({ min, max, approvalPercentage, ...data }) => ({
			range: max
				? `${formatCurrency(min)} - ${formatCurrency(max)}`
				: `+ ${formatCurrency(min)}`,
			approvalPercentage: Math.ceil(approvalPercentage * 100),
			...data,
		}),
	);

	return (
		<>
			{isFetching && <Skeleton className="h-124" />}
			{!isFetching && (
				<Card className="pb-0">
					<CardHeader>
						<CardTitle>Distribuição por intervalos de valor</CardTitle>
						<CardDescription>
							Visualização da distribuição das obras e dos orçamentos por
							intervalos de valor.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea orientation="horizontal">
							<ChartContainer
								config={chartConfig}
								className="h-96 w-full min-w-400 pb-6">
								<BarChart
									data={chartData}
									margin={{ top: 30 }}
									accessibilityLayer>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="range"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent className="w-56" hideLabel />}
									/>
									<Bar
										dataKey="projectCount"
										fill="var(--color-projectCount)"
										radius={8}>
										<LabelList
											position="top"
											offset={10}
											fontSize={12}
											className="fill-foreground"
										/>
									</Bar>
									<Bar
										dataKey="budgetSent"
										fill="var(--color-budgetSent)"
										radius={8}>
										<LabelList
											position="top"
											offset={10}
											fontSize={12}
											className="fill-foreground"
										/>
									</Bar>
									<Bar
										dataKey="budgetApproved"
										fill="var(--color-budgetApproved)"
										radius={8}>
										<LabelList
											position="top"
											offset={10}
											fontSize={12}
											className="fill-foreground"
										/>
									</Bar>
									<Bar
										dataKey="approvalPercentage"
										fill="var(--color-approvalPercentage)"
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
						</ScrollArea>
					</CardContent>
				</Card>
			)}
		</>
	);
}
