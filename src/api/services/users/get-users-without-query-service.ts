import { z } from "zod";
import { api } from "@/api";
import { userSchema } from "@/api/schemas/user-schema";

const getUsersWithoutQueryResponseSchema = z.array(userSchema);

type GetUsersWithoutQueryResponse = z.infer<
	typeof getUsersWithoutQueryResponseSchema
>;

export const getUsersWithoutQueryService = async () => {
	const { data } = await api.get<GetUsersWithoutQueryResponse>(
		"/users/index/no-query",
	);

	return getUsersWithoutQueryResponseSchema.parse(data);
};
