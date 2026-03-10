import { useEffect } from "react";
import { CustomersContent } from "./components/customers-content";
import { CustomersProvider } from "./contexts/customers-provider";

export function Customers() {
	useEffect(() => {
		document.title = "Clientes";
	});

	return (
		<CustomersProvider>
			<CustomersContent />
		</CustomersProvider>
	);
}
