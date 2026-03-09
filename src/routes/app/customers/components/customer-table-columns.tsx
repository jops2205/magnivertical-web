import type { Address } from "@/api/schemas/address-schema";
import type { Customer, CustomerType } from "@/api/schemas/customer-schema";
import { AddressCell } from "@/components/_table-cells/address-cell";
import { DateCell } from "@/components/_table-cells/date-cell";
import { IconCell } from "@/components/_table-cells/icon-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { getCustomerType, getCustomerTypeIcon } from "@/utils/customer-type";
import { CustomerTableRowActions } from "./customer-table-row-actions";

const customerAccessorColumns: AccessorColumnDef<Customer>[] = [
	{
		accessorKey: "name",
		header: "Nome",
	},
	{
		accessorKey: "email",
		header: "E-mail",
	},
	{
		accessorKey: "phone",
		header: "Telefone",
	},
	{
		accessorKey: "taxpayer",
		header: "Contribuinte",
	},
	{
		accessorKey: "type",
		header: "Tipo",
		cell: (type) => {
			return (
				<IconCell
					text={getCustomerType(type as CustomerType)}
					icon={getCustomerTypeIcon(type as CustomerType)}
				/>
			);
		},
	},
	{
		accessorKey: "address",
		header: "Morada",
		cell: (address) => <AddressCell address={address as Address} />,
	},
	{
		accessorKey: "createdAt",
		header: "Data de registo",
		cell: (createdAt) => <DateCell date={createdAt as Date} />,
	},
];

const customerDisplayColumns: DisplayColumnDef<Customer>[] = [
	{
		id: "action",
		cell: (row) => <CustomerTableRowActions row={row} />,
	},
];

export const customerTableColumns = [
	...customerAccessorColumns,
	...customerDisplayColumns,
];
