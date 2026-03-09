import { z } from "zod";
import { api } from "@/api";
import { userSchema } from "@/api/schemas/user-schema";
import type { QueryParams } from "@/utils/types/query-params";

const getUsersResponseSchema = z.object({
	users: z.array(userSchema),
	count: z.int(),
});

type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;

type GetUsersQuery = QueryParams &
	Partial<{
		role: string;
		verified: string;
	}>;

export const getUsersService = async (query: GetUsersQuery) => {
	const { data } = await api.get<GetUsersResponse>("/users/index", {
		params: query,
	});

	return getUsersResponseSchema.parse(data);
};
