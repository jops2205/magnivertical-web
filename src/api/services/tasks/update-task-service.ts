import { api } from "@/api";
import type { CreateTaskData } from "./create-task-service";

export type UpdateTaskData = CreateTaskData & {
	id: string;
};

export const updateTaskService = ({ id, ...data }: UpdateTaskData) => {
	return api.put(`/tasks/${id}`, data);
};
