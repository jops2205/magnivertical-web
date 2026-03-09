import { useQuery } from "@tanstack/react-query";
import { getBudgetsToBeCompletedService } from "@/api/services/budgets/get-budgets-to-be-completed-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useGetBudgetsToBeCompleted = (shouldRun: boolean) => {
	const [queryString] = useQueryString();
	const { status, ...query } = queryString;

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.BUDGETS_TO_COMPLETE, ...Object.values(query), status],
		staleTime: Infinity,
		enabled: shouldRun,
		queryFn: () =>
			getBudgetsToBeCompletedService({
				...query,
				status: status?.toUpperCase(),
			}),
	});

	const budgets = data?.budgets ?? [];
	const count = data?.count ?? 0;

	return { budgets, count, isFetching };
};
