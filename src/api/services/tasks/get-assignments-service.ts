import { z } from "zod";
import { api } from "@/api";
import { taskSchema } from "@/api/schemas/task-schema";
import type { GetTasksQuery } from "./get-tasks-service";

const getAssignmentsResponseSchema = z.object({
	assignments: z.array(taskSchema),
	count: z.int(),
});

export type GetAssignmentsResponse = z.infer<
	typeof getAssignmentsResponseSchema
>;

export type GetAssignmentsQuery = GetTasksQuery &
	Partial<{
		executor: string;
	}>;

export const getAssignmentsService = async (query: GetAssignmentsQuery) => {
	const { data } = await api.get<GetAssignmentsResponse>(
		"/tasks/assignments/index",
		{ params: query },
	);

	return getAssignmentsResponseSchema.parse(data);
};
