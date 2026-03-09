import { useEffect } from "react";
import { TasksContent } from "./components/tasks-content";
import { TasksProvider } from "./contexts/tasks-provider";

export function Tasks() {
	useEffect(() => {
		document.title = "Tarefas";
	});

	return (
		<TasksProvider>
			<TasksContent />
		</TasksProvider>
	);
}
