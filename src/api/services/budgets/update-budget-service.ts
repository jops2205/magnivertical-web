import { api } from "@/api";
import type { BudgetItem } from "@/api/schemas/budget-schema";
import type { CreateBudgetData } from "./create-budget-service";

type UpdateBudgetData = Omit<CreateBudgetData, "items" | "projectId"> & {
	id: string;
	items: (Omit<BudgetItem, "id"> & {
		id?: string;
	})[];
};

export const updateBudgetService = ({ id, ...data }: UpdateBudgetData) => {
	return api.put(`/budgets/${id}`, data);
};
