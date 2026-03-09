import { useQuery } from "@tanstack/react-query";
import { getProjectsService } from "@/api/services/projects/get-projects-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useGetProjects = () => {
	const [queryString] = useQueryString();
	const { status, ...query } = queryString;

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.PROJECTS, ...Object.values(query), status],
		staleTime: Infinity,
		queryFn: () =>
			getProjectsService({
				...query,
				status: status?.toUpperCase(),
			}),
	});

	const projects = data?.projects ?? [];
	const count = data?.count ?? 0;

	return { projects, count, isFetching };
};
