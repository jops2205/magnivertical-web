import { api } from "@/api";
import type { CreateProjectData } from "./create-project-service";

type UpdateProjectData = Omit<CreateProjectData, "customerId"> & {
	id: string;
};

export const updateProjectService = ({ id, ...data }: UpdateProjectData) => {
	return api.put(`/projects/${id}`, data);
};
