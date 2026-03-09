import { CircleDashedIcon, DownloadIcon } from "lucide-react";
import { useDeleteBudget } from "@/api/hooks/budgets/use-delete-budget";
import { useGetBudgetReports } from "@/api/hooks/budgets/use-get-budget-reports";
import { useUpdateBudgetStatus } from "@/api/hooks/budgets/use-update-budget-status";
import type { Budget, BudgetStatus } from "@/api/schemas/budget-schema";
import { DataTableRowActionsTrigger } from "@/components/data-table-row-actions-trigger";
import { DeleteDialogActions } from "@/components/delete-dialog-actions";
import { DeleteDialogTrigger } from "@/components/delete-dialog-trigger";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { useBudgetStatusTransition } from "@/hooks/use-budget-status-transition";
import { budgetStatusOptions } from "@/utils/budget-status";
import { NOT_OPERATOR_BUDGED_STATUS } from "@/utils/consts/not-operator-budget-status";
import { UpdateBudgetForm } from "./update-budget-form";

type BudgetTableRowActionsProps = {
	row: Budget;
};

export function BudgetTableRowActions({ row }: BudgetTableRowActionsProps) {
	const { user } = useCurrentUser();
	const { deleteBudget, isPending: isDeletePending } = useDeleteBudget();
	const { getBudgetReports } = useGetBudgetReports();

	const { updateBudgetStatus, isPending: isUpdateStatusPending } =
		useUpdateBudgetStatus();

	const { getNextStates } = useBudgetStatusTransition();

	const isPending = isDeletePending || isUpdateStatusPending;

	const nextStates = getNextStates(row.status);

	const handleStatusTransition = async (
		status: BudgetStatus,
		isAllowed: boolean,
	) => {
		if (isAllowed) {
			await updateBudgetStatus({ id: row.id, status });
		}
	};

	const handleDeleteButtonClick = async () => await deleteBudget(row.id);

	const handleReportButtonClick = async () => {
		const { data } = await getBudgetReports(row.id);

		const blob = new Blob([data], { type: "application/pdf" });

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");

		a.href = url;
		a.download = "orçamento.pdf";
		a.click();

		URL.revokeObjectURL(url);
	};

	return (
		<DropdownMenu>
			<DataTableRowActionsTrigger />
			<DropdownMenuContent align="end" className="w-40">
				<UpdateBudgetForm budget={row} />
				{nextStates.length > 0 && (
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<CircleDashedIcon className="size-4 text-muted-foreground" />
							Editar status
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuGroup>
								{budgetStatusOptions
									.filter(({ value }) =>
										NOT_OPERATOR_BUDGED_STATUS.includes(value),
									)
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
				<DropdownMenuItem onSelect={handleReportButtonClick}>
					<DownloadIcon />
					Relatório
				</DropdownMenuItem>
				{user?.role === "MANAGER" && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<DeleteDialogTrigger />
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Apagar orçamento</AlertDialogTitle>
								<AlertDialogDescription>
									Esta operação não pode ser desfeita. O orçamento e todas as
									suas informações associadas serão removidos permanentemente.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<DeleteDialogActions
								disableActions={isPending}
								onDeleteButtonClick={handleDeleteButtonClick}
							/>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
