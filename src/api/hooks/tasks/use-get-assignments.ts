import { useQuery } from "@tanstack/react-query";
import {
	type GetAssignmentsQuery,
	getAssignmentsService,
} from "@/api/services/tasks/get-assignments-service";
import { queryKeys } from "@/config/query-keys";

export const useGetAssignments = (
	query: GetAssignmentsQuery,
	shouldRun: boolean,
) => {
	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.ASSIGNMENTS, ...Object.values(query)],
		staleTime: Infinity,
		enabled: shouldRun,
		queryFn: () => getAssignmentsService(query),
	});

	const assignments = data?.assignments ?? [];
	const count = data?.count ?? 0;

	return { assignments, count, isFetching };
};
