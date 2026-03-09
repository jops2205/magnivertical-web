import { api } from "@/api";
import type { TaskStatus } from "@/api/schemas/task-schema";

type UpdateTaskStatusData = {
	id: string;
	status: TaskStatus;
};

export const updateTaskStatusService = ({
	id,
	status,
}: UpdateTaskStatusData) => {
	return api.patch(`/tasks/status/${id}`, { status });
};
