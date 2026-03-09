import { useEffect } from "react";
import { Navigate } from "react-router";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { CustomersContent } from "./components/customers-content";
import { CustomersProvider } from "./contexts/customers-provider";

export function Customers() {
	useEffect(() => {
		document.title = "Clientes";
	});

	const { user } = useCurrentUser();

	if (user?.role === "OPERATOR") {
		return <Navigate to="/tasks" replace />;
	}

	return (
		<CustomersProvider>
			<CustomersContent />
		</CustomersProvider>
	);
}
