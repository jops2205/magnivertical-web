import { api } from "@/api";

export const deleteTaskService = (id: string) => {
	return api.delete(`/tasks/${id}`);
};
