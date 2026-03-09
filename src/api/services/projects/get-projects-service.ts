import { z } from "zod";
import { api } from "@/api";
import { projectSchema } from "@/api/schemas/project-schema";
import type { QueryParams } from "@/utils/types/query-params";

const getProjectsResponseSchema = z.object({
	projects: z.array(projectSchema),
	count: z.int(),
});

type GetProjectsResponse = z.infer<typeof getProjectsResponseSchema>;

type GetProjectsQuery = QueryParams &
	Partial<{
		from: string;
		to: string;
		status: string;
		customer: string;
	}>;

export const getProjectsService = async (query: GetProjectsQuery) => {
	const { data } = await api.get<GetProjectsResponse>("/projects/index", {
		params: query,
	});

	return getProjectsResponseSchema.parse(data);
};
