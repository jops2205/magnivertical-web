import { useEffect } from "react";
import { ProjectsContent } from "./components/projects-content";
import { ProjectsProvider } from "./contexts/projects-provider";

export function Projects() {
	useEffect(() => {
		document.title = "Obras";
	});

	return (
		<ProjectsProvider>
			<ProjectsContent />
		</ProjectsProvider>
	);
}
