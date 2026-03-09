import type { BudgetItemType } from "@/api/schemas/budget-schema";

type Options = ReadonlyArray<{
	key: string;
	value: BudgetItemType;
}>;

export const budgetItemTypeOptions: Options = [
	{
		key: "Alumínio",
		value: "ALUMINUM",
	},
	{
		key: "Compósito",
		value: "COMPOSITE",
	},
	{
		key: "Vidro",
		value: "GLASS",
	},
	{
		key: "Inox",
		value: "INOX",
	},
	{
		key: "Ferro",
		value: "IRON",
	},
	{
		key: "Chapa",
		value: "SHEET",
	},
];

const budgetItemTypeLabels = new Map(
	budgetItemTypeOptions.map(({ key, value }) => [value, key]),
);

export const getBudgetItemType = (type: BudgetItemType) => {
	return budgetItemTypeLabels.get(type) ?? type;
};
