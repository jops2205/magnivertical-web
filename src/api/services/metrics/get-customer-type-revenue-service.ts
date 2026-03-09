import { z } from "zod";
import { api } from "@/api";
import type { MetricQueryParams } from "@/utils/types/metric-query-params";

const customerTypeRevenueSchema = z.object({
	revenue: z.int().nonnegative(),
	percentage: z.number().min(0).max(1),
});

const getCustomerTypeRevenueResponseSchema = z.object({
	business: customerTypeRevenueSchema,
	individual: customerTypeRevenueSchema,
});

type GetCustomerTypeRevenueResponse = z.infer<
	typeof getCustomerTypeRevenueResponseSchema
>;

export const getCustomerTypeRevenueService = async (
	query: MetricQueryParams,
) => {
	const { data } = await api.get<GetCustomerTypeRevenueResponse>(
		"/metrics/customer-type-revenue",
		{
			params: query,
		},
	);

	return getCustomerTypeRevenueResponseSchema.parse(data);
};
