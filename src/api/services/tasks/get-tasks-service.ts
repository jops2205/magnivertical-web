import { z } from "zod";
import { api } from "@/api";
import { taskSchema } from "@/api/schemas/task-schema";
import type { QueryParams } from "@/utils/types/query-params";

export const getTasksResponseSchema = z.object({
	tasks: z.array(taskSchema),
	count: z.int(),
});

export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>;

export type GetTasksQuery = QueryParams &
	Partial<{
		status: string;
		priority: string;
	}>;

export const getTasksService = async (query: GetTasksQuery) => {
	const { data } = await api.get<GetTasksResponse>("/tasks/index", {
		params: query,
	});

	return getTasksResponseSchema.parse(data);
};
