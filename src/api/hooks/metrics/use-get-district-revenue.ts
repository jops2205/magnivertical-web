import { useQuery } from "@tanstack/react-query";
import { districts } from "@/api/schemas/address-schema";
import { getDistrictRevenueService } from "@/api/services/metrics/get-district-revenue-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

type DistrictRevenue = Record<
	(typeof districts)[number],
	{
		revenue: number;
	}
>;

export const useGetDistrictRevenue = () => {
	const [queryString] = useQueryString();

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.DISTRICT_REVENUE, ...Object.values(queryString)],
		staleTime: Infinity,
		queryFn: () => getDistrictRevenueService(queryString),
	});

	const defaultDistrictRevenue = districts.reduce((districts, district) => {
		districts[district] = {
			revenue: 0,
		};

		return districts;
	}, {} as DistrictRevenue);

	return { districts: data?.districts ?? defaultDistrictRevenue, isFetching };
};
