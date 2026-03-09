import type { BudgetStatus } from "@/api/schemas/budget-schema";
import { useStateTransition } from "./use-state-transition";

export const useBudgetStatusTransition = () => {
	return useStateTransition<BudgetStatus>({
		DRAFT: ["SENT"],
		SENT: ["UNDER_REVIEW", "NOT_REQUESTED", "REQUESTED"],
		UNDER_REVIEW: ["SENT"],
		NOT_REQUESTED: [],
		REQUESTED: ["IN_PRODUCTION"],
		IN_PRODUCTION: ["PENDING_COMPLETION"],
		PENDING_COMPLETION: ["COMPLETED"],
		COMPLETED: [],
	});
};
