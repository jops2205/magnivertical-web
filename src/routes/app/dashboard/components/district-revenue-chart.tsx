import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useGetDistrictRevenue } from "@/api/hooks/metrics/use-get-district-revenue";
import type { District } from "@/api/schemas/address-schema";
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
import { getDistrict } from "@/utils/districts";
import { formatCurrency } from "@/utils/funcs/formatters";

type ChartData = {
	district: District;
	revenue: number;
};

const chartConfig: ChartConfig = {
	revenue: {
		label: "Receita",
		color: "var(--chart-2)",
	},
};

export function DistrictRevenueChart() {
	const { districts, isFetching } = useGetDistrictRevenue();

	const chartData: ChartData[] = Object.entries(districts).map(
		([district, { revenue }]) => ({
			district: district as District,
			revenue,
		}),
	);

	return (
		<>
			{isFetching && <Skeleton className="h-124" />}
			{!isFetching && (
				<Card className="pb-0">
					<CardHeader>
						<CardTitle>Receita por distrito</CardTitle>
						<CardDescription>
							Valor total de receita gerada pelas obras registadas em cada
							distrito.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea orientation="horizontal">
							<ChartContainer
								config={chartConfig}
								className="h-96 w-full min-w-425 pb-6">
								<BarChart
									data={chartData}
									margin={{ top: 30 }}
									accessibilityLayer>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="district"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(value) => getDistrict(value)}
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
