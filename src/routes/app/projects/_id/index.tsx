import { Navigate, useParams } from "react-router";
import { useGetProject } from "@/api/hooks/projects/use-get-project";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { ProjectContent } from "./components/project-content";
import { ProjectProvider } from "./contexts/project-provider";

export function Project() {
	const { id } = useParams();
	const { project } = useGetProject(id!);
	const { user } = useCurrentUser();

	if (user?.role === "OPERATOR") {
		return <Navigate to="/tasks" replace />;
	}

	if (!project) {
		return null;
	}

	return (
		<ProjectProvider>
			<ProjectContent project={project} />
		</ProjectProvider>
	);
}
