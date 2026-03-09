import { useQuery } from "@tanstack/react-query";
import { getUsersService } from "@/api/services/users/get-users-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useGetUsers = () => {
	const [queryString] = useQueryString();
	const { role, ...query } = queryString;

	const { data, isFetching } = useQuery({
		queryKey: [queryKeys.USERS, ...Object.values(query), role],
		staleTime: Infinity,
		queryFn: () =>
			getUsersService({
				...query,
				role: role?.toUpperCase(),
			}),
	});

	const users = data?.users ?? [];
	const count = data?.count ?? 0;

	return { users, count, isFetching };
};
