import { z } from "zod";
import { api } from "@/api";
import { customerSchema } from "@/api/schemas/customer-schema";
import type { QueryParams } from "@/utils/types/query-params";

const getCustomersResponseSchema = z.object({
	customers: z.array(customerSchema),
	count: z.int(),
});

type GetCustomersResponse = z.infer<typeof getCustomersResponseSchema>;

type GetCustomersQuery = QueryParams &
	Partial<{
		type: string;
	}>;

export const getCustomersService = async (query: GetCustomersQuery) => {
	const { data } = await api.get<GetCustomersResponse>("/customers/index", {
		params: query,
	});

	return getCustomersResponseSchema.parse(data);
};
