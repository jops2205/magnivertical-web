import type { Address } from "@/api/schemas/address-schema";
import type { Project, ProjectStatus } from "@/api/schemas/project-schema";
import { AddressCell } from "@/components/_table-cells/address-cell";
import { CustomerCell } from "@/components/_table-cells/customer-cell";
import { DateCell } from "@/components/_table-cells/date-cell";
import { IconCell } from "@/components/_table-cells/icon-cell";
import { NullCell } from "@/components/_table-cells/null-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { getProjectStatus, getProjectStatusIcon } from "@/utils/project-status";
import { ProjectTableRowActions } from "./project-table-row-actions";

const projectAccessorColumns: AccessorColumnDef<Project>[] = [
	{
		accessorKey: "name",
		header: "Referência",
	},
	{
		accessorKey: "code",
		header: "Código",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: (status) => {
			return (
				<IconCell
					text={getProjectStatus(status as ProjectStatus)}
					icon={getProjectStatusIcon(status as ProjectStatus)}
				/>
			);
		},
	},
	{
		accessorKey: "customerId",
		header: "Cliente",
		cell: (value) => {
			const customerId = value as string | null;

			if (!customerId) {
				return <NullCell />;
			}

			return <CustomerCell id={customerId} />;
		},
	},
	{
		accessorKey: "address",
		header: "Morada",
		cell: (address) => <AddressCell address={address as Address} />,
	},
	{
		accessorKey: "startedAt",
		header: "Iniciada em",
		cell: (startedAt) => <DateCell date={startedAt as Date} />,
	},
	{
		accessorKey: "endedAt",
		header: "Finalizada em",
		cell: (value) => {
			const endedAt = value as Date | null;

			if (!endedAt) {
				return <NullCell />;
			}

			return <DateCell date={endedAt} />;
		},
	},
];

const projectDisplayColumns: DisplayColumnDef<Project>[] = [
	{
		id: "action",
		cell: (row) => <ProjectTableRowActions row={row} />,
	},
];

export const projectTableColumns = [
	...projectAccessorColumns,
	...projectDisplayColumns,
];
