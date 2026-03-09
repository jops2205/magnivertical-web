import { api } from "@/api";
import type { CreateTaskData } from "./create-task-service";

type CreateAssignmentData = CreateTaskData & {
	id: string;
};

export const createAssignmentService = ({
	id,
	...data
}: CreateAssignmentData) => {
	return api.post(`/tasks/assignments/${id}`, data);
};
