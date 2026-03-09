import { api } from "@/api";
import type { TaskPriority } from "@/api/schemas/task-schema";

export type CreateTaskData = {
	title: string;
	description: string;
	priority: TaskPriority;
	scheduledAt: Date;
};

export const createTaskService = (data: CreateTaskData) => {
	return api.post("/tasks", data);
};
