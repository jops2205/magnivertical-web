import { useGetProjectBudgets } from "@/api/hooks/projects/use-get-project-budgets";
import type { Project } from "@/api/schemas/project-schema";
import { DataTable } from "@/components/data-table";
import { budgetTableColumns } from "./budget-table-columns";
import { CreateBudgetForm } from "./create-budget-form";

type BudgetTableProps = {
	project: Project;
};

export function BudgetTable({ project }: BudgetTableProps) {
	const { budgets, isFetching } = useGetProjectBudgets(project.id);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-2xl tracking-tight">Orçamentos</h2>
				<CreateBudgetForm project={project} disableTrigger={isFetching} />
			</div>
			<DataTable
				data={budgets}
				columns={budgetTableColumns}
				isLoading={isFetching}
			/>
		</div>
	);
}
