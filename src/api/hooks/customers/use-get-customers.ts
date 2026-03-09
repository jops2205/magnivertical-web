import { useQuery } from "@tanstack/react-query";
import { getCustomersService } from "@/api/services/customers/get-customers-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useGetCustomers = () => {
	const [queryString] = useQueryString();
	const { type, ...query } = queryString;

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.CUSTOMERS, ...Object.values(query), type],
		staleTime: Infinity,
		queryFn: () =>
			getCustomersService({
				...query,
				type: type?.toUpperCase(),
			}),
	});

	const customers = data?.customers ?? [];
	const count = data?.count ?? 0;

	return { customers, count, isFetching };
};
