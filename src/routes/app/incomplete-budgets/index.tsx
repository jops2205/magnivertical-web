import { useEffect } from "react";
import { Navigate } from "react-router";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { IncompleteBudgetsContent } from "./components/incomplete-budgets-content";
import { IncompleteBudgetsProvider } from "./contexts/incomplete-budgets-provider";

export function IncompleteBudgets() {
	useEffect(() => {
		document.title = "Serviços";
	});

	const { user } = useCurrentUser();

	if (user?.role === "MANAGER") {
		return <Navigate to="/" replace />;
	}

	if (user?.role === "ASSISTANT") {
		return <Navigate to="/tasks" replace />;
	}

	return (
		<IncompleteBudgetsProvider>
			<IncompleteBudgetsContent />
		</IncompleteBudgetsProvider>
	);
}
