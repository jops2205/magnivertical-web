import { useQuery } from "@tanstack/react-query";
import { getCustomersWithoutQueryService } from "@/api/services/customers/get-customers-without-query-service";
import { queryKeys } from "@/config/query-keys";

export const useGetCustomersWithoutQuery = () => {
	const { data: customers = [], isFetching } = useQuery({
		queryKey: [queryKeys.CUSTOMERS_WITHOUT_QUERY],
		staleTime: Infinity,
		queryFn: () => getCustomersWithoutQueryService(),
	});

	return { customers, isFetching };
};
