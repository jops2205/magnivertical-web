import { useGetCustomersWithoutQuery } from "@/api/hooks/customers/use-get-customers-without-query";

type UseCustomerIdsReturn = ReadonlyArray<{
	id: string;
	name: string;
}>;

export const useCustomerIds = () => {
	const { customers } = useGetCustomersWithoutQuery();

	return customers.map((customer) => ({
		id: customer.id,
		name: customer.name,
	})) satisfies UseCustomerIdsReturn;
};
