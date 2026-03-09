import { useEffect } from "react";
import { Navigate } from "react-router";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { UsersContent } from "./components/users-content";
import { UsersProvider } from "./contexts/users-provider";

export function Users() {
	useEffect(() => {
		document.title = "Colaboradores";
	});

	const { user } = useCurrentUser();

	if (user?.role !== "MANAGER") {
		return <Navigate to="/tasks" replace />;
	}

	return (
		<UsersProvider>
			<UsersContent />
		</UsersProvider>
	);
}
