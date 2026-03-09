import { useQuery } from "@tanstack/react-query";
import {
	type GetTasksQuery,
	getTasksService,
} from "@/api/services/tasks/get-tasks-service";
import { queryKeys } from "@/config/query-keys";

export const useGetTasks = (query: GetTasksQuery) => {
	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.TASKS, ...Object.values(query)],
		staleTime: Infinity,
		queryFn: () => getTasksService(query),
	});

	const tasks = data?.tasks ?? [];
	const count = data?.count ?? 0;

	return { tasks, count, isFetching };
};
