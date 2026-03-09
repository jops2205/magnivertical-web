import { useCustomerIds } from "@/hooks/use-customer-ids";

type CustomerCellProps = {
	id: string;
};

export function CustomerCell({ id }: CustomerCellProps) {
	const customerIds = useCustomerIds();

	const customers = Object.fromEntries(
		customerIds.map(({ id, name }) => [id, name]),
	);

	return <>{customers[id]}</>;
}
