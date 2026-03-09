import { useQuery } from "@tanstack/react-query";
import { getCustomerService } from "@/api/services/customers/get-customer-service";
import { queryKeys } from "@/config/query-keys";

export const useGetCustomer = (id: string) => {
	const { data: customer, isFetching } = useQuery({
		queryKey: [queryKeys.CUSTOMER, id],
		staleTime: Infinity,
		queryFn: () => getCustomerService(id),
	});

	return { customer, isFetching };
};
