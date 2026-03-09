import { api } from "@/api";
import { type Project, projectSchema } from "@/api/schemas/project-schema";

type GetProjectResponse = Project;

export const getProjectService = async (id: string) => {
	const { data } = await api.get<GetProjectResponse>(`/projects/${id}`);

	return projectSchema.parse(data);
};
