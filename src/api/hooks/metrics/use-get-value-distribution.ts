import { useQuery } from "@tanstack/react-query";
import { getValueDistributionService } from "@/api/services/metrics/get-value-distribution-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useGetValueDistribution = () => {
	const [queryString] = useQueryString();

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.VALUE_DISTRIBUTION, ...Object.values(queryString)],
		staleTime: Infinity,
		queryFn: () => getValueDistributionService(queryString),
	});

	const ranges = data?.ranges ?? [];

	return { ranges, isFetching };
};
