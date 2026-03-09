import { useQuery } from "@tanstack/react-query";
import { getProjectBudgetsService } from "@/api/services/projects/get-project-budgets-service";
import { queryKeys } from "@/config/query-keys";

export const useGetProjectBudgets = (id: string) => {
	const { data: budgets = [], isFetching } = useQuery({
		queryKey: [queryKeys.BUDGETS, id],
		staleTime: Infinity,
		queryFn: () => getProjectBudgetsService(id),
	});

	return { budgets, isFetching };
};
