import { z } from "zod";
import { api } from "@/api";
import { customerSchema } from "@/api/schemas/customer-schema";

const getCustomersWithoutQueryResponseSchema = z.array(customerSchema);

type GetCustomersWithoutQueryResponse = z.infer<
	typeof getCustomersWithoutQueryResponseSchema
>;

export const getCustomersWithoutQueryService = async () => {
	const { data } = await api.get<GetCustomersWithoutQueryResponse>(
		"/customers/index/no-query",
	);

	return getCustomersWithoutQueryResponseSchema.parse(data);
};
