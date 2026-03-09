import { api } from "@/api";
import type { BudgetItem } from "@/api/schemas/budget-schema";

export type CreateBudgetData = {
	name: string;
	percentageDiscount: number;
	attachmentsUrl: string;
	items: Omit<BudgetItem, "id">[];
	projectId: string;
};

export const createBudgetService = (data: CreateBudgetData) => {
	return api.post("/budgets", data);
};
