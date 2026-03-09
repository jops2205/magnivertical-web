import { useEffect } from "react";
import { Navigate } from "react-router";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { DashboardContent } from "./components/dashboard-content";
import { DashboardProvider } from "./contexts/dashboard-provider";

export function Dashboard() {
	useEffect(() => {
		document.title = "Painel de Controlo";
	});

	const { user } = useCurrentUser();

	if (user?.role !== "MANAGER") {
		return <Navigate to="/tasks" replace />;
	}

	return (
		<DashboardProvider>
			<DashboardContent />
		</DashboardProvider>
	);
}
