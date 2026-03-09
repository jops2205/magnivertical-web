import { useQuery } from "@tanstack/react-query";
import { getProjectService } from "@/api/services/projects/get-project-service";
import { queryKeys } from "@/config/query-keys";

export const useGetProject = (id: string) => {
	const { data: project, isFetching } = useQuery({
		queryKey: [queryKeys.PROJECT, id],
		staleTime: Infinity,
		queryFn: () => getProjectService(id),
	});

	return { project, isFetching };
};
