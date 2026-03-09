import { api } from "@/api";

export const deleteBudgetService = (id: string) => {
	return api.delete(`/budgets/${id}`);
};
