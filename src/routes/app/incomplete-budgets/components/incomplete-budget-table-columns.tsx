import type { Budget, BudgetStatus } from "@/api/schemas/budget-schema";
import { DateCell } from "@/components/_table-cells/date-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getBudgetStatus } from "@/utils/budget-status";
import { IncompleteBudgetTableRowActions } from "./incomplete-budget-table-row-actions";

const incompleteBudgetAccessorColumns: AccessorColumnDef<Budget>[] = [
	{
		accessorKey: "name",
		header: "Descrição",
		cell: (name) => <div className="max-w-md truncate">{name as string}</div>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: (status) => <>{getBudgetStatus(status as BudgetStatus)}</>,
	},
	{
		accessorKey: "attachmentsUrl",
		header: "Anexo",
		cell: (value) => {
			const attachmentsUrl = value as string;

			return (
				<Button className="h-8 px-0" variant="link" asChild>
					<a href={attachmentsUrl} target="_blank">
						{attachmentsUrl}
					</a>
				</Button>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Data de registo",
		cell: (createdAt) => <DateCell date={createdAt as Date} />,
	},
];

const incompleteBudgetDisplayColumns: DisplayColumnDef<Budget>[] = [
	{
		id: "action",
		cell: (row) => <IncompleteBudgetTableRowActions row={row} />,
	},
];

export const incompleteBudgetTableColumns = [
	...incompleteBudgetAccessorColumns,
	...incompleteBudgetDisplayColumns,
];
