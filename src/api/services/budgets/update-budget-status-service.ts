import { api } from "@/api";
import type { BudgetStatus } from "@/api/schemas/budget-schema";

type UpdateBudgetStatusData = {
	id: string;
	status: BudgetStatus;
};

export const updateBudgetStatusService = ({
	id,
	status,
}: UpdateBudgetStatusData) => {
	return api.patch(`/budgets/status/${id}`, { status });
};
