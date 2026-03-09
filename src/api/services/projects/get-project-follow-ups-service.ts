import { z } from "zod";
import { api } from "@/api";
import { followUpSchema } from "@/api/schemas/follow-up-schema";

const getProjectFollowUpsResponseSchema = z.array(followUpSchema);

type GetProjectFollowUpsResponse = z.infer<
	typeof getProjectFollowUpsResponseSchema
>;

export const getProjectFollowUpsService = async (id: string) => {
	const { data } = await api.get<GetProjectFollowUpsResponse>(
		`/projects/follow-ups/index/${id}`,
	);

	return getProjectFollowUpsResponseSchema.parse(data);
};
