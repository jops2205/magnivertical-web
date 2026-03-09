import { z } from "zod";
import { api } from "@/api";
import { budgetSchema } from "@/api/schemas/budget-schema";
import type { QueryParams } from "@/utils/types/query-params";

const getBudgetsToBeCompletedResponseSchema = z.object({
	budgets: z.array(budgetSchema),
	count: z.int(),
});

type GetBudgetsToBeCompletedResponse = z.infer<
	typeof getBudgetsToBeCompletedResponseSchema
>;

type GetBudgetsToBeCompletedQuery = QueryParams &
	Partial<{
		status: string;
	}>;

export const getBudgetsToBeCompletedService = async (
	query: GetBudgetsToBeCompletedQuery,
) => {
	const { data } = await api.get<GetBudgetsToBeCompletedResponse>(
		"/budgets/incomplete/index",
		{
			params: query,
		},
	);

	return getBudgetsToBeCompletedResponseSchema.parse(data);
};
