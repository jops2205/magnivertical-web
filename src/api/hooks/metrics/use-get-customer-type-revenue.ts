import { useQuery } from "@tanstack/react-query";
import { getCustomerTypeRevenueService } from "@/api/services/metrics/get-customer-type-revenue-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useGetCustomerTypeRevenue = () => {
	const [queryString] = useQueryString();

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.CUSTOMER_TYPE_REVENUE, ...Object.values(queryString)],
		staleTime: Infinity,
		queryFn: () => getCustomerTypeRevenueService(queryString),
	});

	const business = data?.business ?? {
		revenue: 0,
		percentage: 0,
	};

	const individual = data?.individual ?? {
		revenue: 0,
		percentage: 0,
	};

	return { business, individual, isFetching };
};
