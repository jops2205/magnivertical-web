import type { FollowUp, FollowUpStatus } from "@/api/schemas/follow-up-schema";
import { DateCell } from "@/components/_table-cells/date-cell";
import { NullCell } from "@/components/_table-cells/null-cell";
import { UserCell } from "@/components/_table-cells/user-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { getFollowUpStatus } from "@/utils/follow-up-status";
import { FollowUpTableRowActions } from "./follow-up-table-row-actions";

const followUpAccessorColumns: AccessorColumnDef<FollowUp>[] = [
	{
		accessorKey: "description",
		header: "Descrição",
		cell: (value) => {
			const description = value as string | null;

			if (!description) {
				return <NullCell />;
			}

			return <div className="max-w-md truncate">{description}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: (status) => <>{getFollowUpStatus(status as FollowUpStatus)}</>,
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
		header: "Date de registo",
		cell: (createdAt) => <DateCell date={createdAt as Date} />,
	},
	{
		accessorKey: "scheduledAt",
		header: "Data de agendamento",
		cell: (scheduledAt) => <DateCell date={scheduledAt as Date} />,
	},
	{
		accessorKey: "resolvedAt",
		header: "Data de realização",
		cell: (value) => {
			const resolvedAt = value as Date | null;

			if (!resolvedAt) {
				return <NullCell />;
			}

			return <DateCell date={resolvedAt} />;
		},
	},
];

const followUpDisplayColumns: DisplayColumnDef<FollowUp>[] = [
	{
		id: "action",
		cell: (row) => <FollowUpTableRowActions row={row} />,
	},
];

export const followUpsTableColumns = [
	...followUpAccessorColumns,
	...followUpDisplayColumns,
];
