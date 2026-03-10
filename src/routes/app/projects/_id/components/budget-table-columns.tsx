import type {
	Budget,
	BudgetItem,
	BudgetStatus,
} from "@/api/schemas/budget-schema";
import { CurrencyCell } from "@/components/_table-cells/currency-cell";
import { DateCell } from "@/components/_table-cells/date-cell";
import { NullCell } from "@/components/_table-cells/null-cell";
import { UserCell } from "@/components/_table-cells/user-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getBudgetStatus } from "@/utils/budget-status";
import { BudgetTableRowActions } from "./budget-table-row-actions";

const budgetAccessorColumns: AccessorColumnDef<Budget>[] = [
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
		accessorKey: "items",
		header: "Total",
		cell: (value) => {
			const items = value as BudgetItem[];

			const total = items.reduce((total, item) => total + item.price, 0);

			return <CurrencyCell value={total} />;
		},
	},
	{
		accessorKey: "percentageDiscount",
		header: "Desconto",
		cell: (percentageDiscount) => (
			<>{(percentageDiscount as number).toString().concat("%")}</>
		),
	},
	{
		accessorKey: "attachmentsUrl",
		header: "Link para os anexos",
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
		accessorKey: "userId",
		header: "Colaborador",
		cell: (value) => {
			const userId = value as string | null;

			if (!userId) {
				return <NullCell />;
			}

			return <UserCell id={userId} />;
		},
	},
	{
		accessorKey: "createdAt",
		header: "Registado em",
		cell: (createdAt) => <DateCell date={createdAt as Date} />,
	},
];

const budgetDisplayColumns: DisplayColumnDef<Budget>[] = [
	{
		id: "action",
		cell: (row) => <BudgetTableRowActions row={row} />,
	},
];

export const budgetTableColumns = [
	...budgetAccessorColumns,
	...budgetDisplayColumns,
];
