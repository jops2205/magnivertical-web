import { api } from "@/api";

export const getBudgetReportsService = (id: string) => {
	return api.get(`/budgets/reports/${id}`, {
		responseType: "blob",
	});
};
