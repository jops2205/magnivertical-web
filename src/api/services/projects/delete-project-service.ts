import { api } from "@/api";

export const deleteProjectService = (id: string) => {
	return api.delete(`/projects/${id}`);
};
