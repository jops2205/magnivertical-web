import type { BudgetStatus } from "@/api/schemas/budget-schema";

type Options = ReadonlyArray<{
	key: string;
	value: BudgetStatus;
}>;

export const budgetStatusOptions: Options = [
	{
		key: "Rascunho",
		value: "DRAFT",
	},
	{
		key: "Enviado",
		value: "SENT",
	},
	{
		key: "Em revisão",
		value: "UNDER_REVIEW",
	},
	{
		key: "Adjudicado",
		value: "REQUESTED",
	},
	{
		key: "Não adjudicado",
		value: "NOT_REQUESTED",
	},
	{
		key: "Em produção",
		value: "IN_PRODUCTION",
	},
	{
		key: "Aguardando conclusão",
		value: "PENDING_COMPLETION",
	},
	{
		key: "Concluído",
		value: "COMPLETED",
	},
];

const budgetStatusLabels = new Map(
	budgetStatusOptions.map(({ key, value }) => [value, key]),
);

export const getBudgetStatus = (status: BudgetStatus) => {
	return budgetStatusLabels.get(status) ?? status;
};
