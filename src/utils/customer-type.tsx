import { Building2Icon, UsersRoundIcon } from "lucide-react";
import type { CustomerType } from "@/api/schemas/customer-schema";

type Options = ReadonlyArray<{
	key: string;
	value: CustomerType;
	icon: React.ReactNode;
}>;

export const customerTypeOptions: Options = [
	{
		key: "Empresa",
		value: "BUSINESS",
		icon: <Building2Icon className="size-4 text-blue-500" />,
	},
	{
		key: "Particular",
		value: "INDIVIDUAL",
		icon: <UsersRoundIcon className="size-4 text-red-500" />,
	},
];

const customerTypeLabels = new Map(
	customerTypeOptions.map(({ key, value }) => [value, key]),
);

export const getCustomerType = (type: CustomerType) => {
	return customerTypeLabels.get(type) ?? type;
};
const customerTypeIcons = new Map(
	customerTypeOptions.map(({ icon, value }) => [value, icon]),
);

export const getCustomerTypeIcon = (type: CustomerType) => {
	return customerTypeIcons.get(type) ?? type;
};
