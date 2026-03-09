import { useEffect } from "react";
import { Navigate } from "react-router";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { ProjectsContent } from "./components/projects-content";
import { ProjectsProvider } from "./contexts/projects-provider";

export function Projects() {
	useEffect(() => {
		document.title = "Obras";
	});

	const { user } = useCurrentUser();

	if (user?.role === "OPERATOR") {
		return <Navigate to="/tasks" replace />;
	}

	return (
		<ProjectsProvider>
			<ProjectsContent />
		</ProjectsProvider>
	);
}
