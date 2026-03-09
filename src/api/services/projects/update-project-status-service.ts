import { api } from "@/api";
import type { ProjectStatus } from "@/api/schemas/project-schema";

type UpdateProjectStatusData = {
	id: string;
	status: ProjectStatus;
};

export const updateProjectStatusService = ({
	id,
	status,
}: UpdateProjectStatusData) => {
	return api.patch(`/projects/status/${id}`, { status });
};
