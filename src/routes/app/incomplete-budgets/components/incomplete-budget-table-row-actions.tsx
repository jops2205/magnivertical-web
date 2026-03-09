import { CircleDashedIcon } from "lucide-react";
import { useUpdateBudgetStatus } from "@/api/hooks/budgets/use-update-budget-status";
import type { Budget, BudgetStatus } from "@/api/schemas/budget-schema";
import { DataTableRowActionsTrigger } from "@/components/data-table-row-actions-trigger";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useBudgetStatusTransition } from "@/hooks/use-budget-status-transition";
import { budgetStatusOptions } from "@/utils/budget-status";
import { OPERATOR_BUDGET_STATUS } from "@/utils/consts/operator-budget-status";

type IncompleteBudgetTableRowActionsProps = {
	row: Budget;
};

export function IncompleteBudgetTableRowActions({
	row,
}: IncompleteBudgetTableRowActionsProps) {
	const { updateBudgetStatus } = useUpdateBudgetStatus();
	const { getNextStates } = useBudgetStatusTransition();

	const nextStates = getNextStates(row.status);

	const handleStatusTransition = async (
		status: BudgetStatus,
		isAllowed: boolean,
	) => {
		if (isAllowed) {
			await updateBudgetStatus({ id: row.id, status });
		}
	};

	return (
		<DropdownMenu>
			<DataTableRowActionsTrigger />
			<DropdownMenuContent align="end" className="w-40">
				{nextStates.length > 0 && (
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<CircleDashedIcon className="size-4 text-muted-foreground" />
							Editar status
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuGroup>
								{budgetStatusOptions
									.filter(({ value }) => OPERATOR_BUDGET_STATUS.includes(value))
									.map(({ value, key }) => {
										const isAllowed = nextStates.includes(value);

										return (
											<DropdownMenuItem
												key={value}
												disabled={!isAllowed}
												onClick={() => {
													handleStatusTransition(value, isAllowed);
												}}>
												{key}
											</DropdownMenuItem>
										);
									})}
							</DropdownMenuGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
