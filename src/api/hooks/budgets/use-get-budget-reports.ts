import { getBudgetReportsService } from "@/api/services/budgets/get-budget-reports-service";

export const useGetBudgetReports = () => {
	const getBudgetReports = getBudgetReportsService;

	return { getBudgetReports };
};
