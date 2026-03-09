import { z } from "zod";
import { api } from "@/api";
import type { MetricQueryParams } from "@/utils/types/metric-query-params";

const getValueDistributionResponseSchema = z.object({
	ranges: z.array(
		z.object({
			min: z.int(),
			max: z.int().optional(),
			projectCount: z.int(),
			budgetSent: z.int(),
			budgetApproved: z.int(),
			approvalPercentage: z.number().min(0).max(1),
		}),
	),
});

type GetValueDistributionResponse = z.infer<
	typeof getValueDistributionResponseSchema
>;

export const getValueDistributionService = async (query: MetricQueryParams) => {
	const { data } = await api.get<GetValueDistributionResponse>(
		"/metrics/value-distribution",
		{
			params: query,
		},
	);

	return getValueDistributionResponseSchema.parse(data);
};
