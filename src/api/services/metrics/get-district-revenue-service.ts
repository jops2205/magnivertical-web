import { z } from "zod";
import { api } from "@/api";
import { districts } from "@/api/schemas/address-schema";
import type { MetricQueryParams } from "@/utils/types/metric-query-params";

const getDistrictRevenueResponseSchema = z.object({
	districts: z.record(z.enum(districts), z.object({ revenue: z.int() })),
});

type GetDistrictRevenueResponse = z.infer<
	typeof getDistrictRevenueResponseSchema
>;

export const getDistrictRevenueService = async (query: MetricQueryParams) => {
	const { data } = await api.get<GetDistrictRevenueResponse>(
		"/metrics/district-revenue",
		{
			params: query,
		},
	);

	return getDistrictRevenueResponseSchema.parse(data);
};
