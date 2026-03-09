import type { User, UserRole } from "@/api/schemas/user-schema";
import { DateCell } from "@/components/_table-cells/date-cell";
import { IconCell } from "@/components/_table-cells/icon-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { getUserRole } from "@/utils/user-role";
import { getUserStatus, getUserStatusIcon } from "@/utils/user-status";
import { UserTableRowActions } from "./user-table-row-actions";

const userAccessorColumns: AccessorColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Nome",
	},
	{
		accessorKey: "email",
		header: "E-mail",
	},
	{
		accessorKey: "role",
		header: "Função",
		cell: (role) => <>{getUserRole(role as UserRole)}</>,
	},
	{
		accessorKey: "verified",
		header: "Status",
		cell: (verified) => {
			const status = verified ? "true" : "false";

			return (
				<IconCell
					text={getUserStatus(status)}
					icon={getUserStatusIcon(status)}
				/>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Data de registo",
		cell: (createdAt) => <DateCell date={createdAt as Date} />,
	},
];

const userDisplayColumns: DisplayColumnDef<User>[] = [
	{
		id: "action",
		cell: (row) => <UserTableRowActions row={row} />,
	},
];

export const userTableColumns = [...userAccessorColumns, ...userDisplayColumns];
