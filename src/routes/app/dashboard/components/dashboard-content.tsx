import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDashboard } from "../contexts/dashboard-provider";
import { BudgetItemTypeRevenueChart } from "./budget-item-type-revenue-chart";
import { CustomerTypeRevenueChart } from "./customer-type-revenue-chart";
import { DistrictRevenueChart } from "./district-revenue-chart";
import { MetricFilterSheet } from "./metric-filter-sheet";
import { ValueDistributionChart } from "./value-distribution-chart";

export function DashboardContent() {
	const { setIsMetricFilterDialogOpen } = useDashboard();
	const { isDesktop } = useMediaQuery();

	const handleTriggerButtonClick = () => setIsMetricFilterDialogOpen(true);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
					<p className="hidden text-zinc-500 md:block dark:text-zinc-400">
						Acompanhe estatísticas detalhadas sobre clientes e obras.
					</p>
				</div>
				<Button
					onClick={handleTriggerButtonClick}
					size={isDesktop ? "default" : "icon"}
					variant="outline">
					<SlidersHorizontalIcon />
					{isDesktop && "Filtros"}
				</Button>
			</div>
			<ValueDistributionChart />
			<div className="flex flex-col gap-6 md:flex-row">
				<CustomerTypeRevenueChart />
				<BudgetItemTypeRevenueChart />
			</div>
			<DistrictRevenueChart />
			<MetricFilterSheet />
		</div>
	);
}
