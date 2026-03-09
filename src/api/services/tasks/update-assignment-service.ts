import { api } from "@/api";
import type { UpdateTaskData } from "./update-task-service";

type UpdateAssignmentData = UpdateTaskData & {
	executorId: string;
};

export const updateAssignmentService = ({
	id,
	...data
}: UpdateAssignmentData) => {
	return api.put(`/tasks/assignments/${id}`, data);
};
