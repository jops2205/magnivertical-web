import { z } from "zod";
import { api } from "@/api";
import { budgetItemType } from "@/api/schemas/budget-schema";
import type { MetricQueryParams } from "@/utils/types/metric-query-params";

const getBudgetItemTypeRevenueResponseSchema = z.object({
	items: z.record(z.enum(budgetItemType), z.object({ revenue: z.int() })),
});

type GetBudgetItemTypeRevenueResponse = z.infer<
	typeof getBudgetItemTypeRevenueResponseSchema
>;

export const getBudgetItemTypeRevenueService = async (
	query: MetricQueryParams,
) => {
	const { data } = await api.get<GetBudgetItemTypeRevenueResponse>(
		"/metrics/budget-item-revenue",
		{
			params: query,
		},
	);

	return getBudgetItemTypeRevenueResponseSchema.parse(data);
};
