import { useQuery } from "@tanstack/react-query";
import { getUsersWithoutQueryService } from "@/api/services/users/get-users-without-query-service";
import { queryKeys } from "@/config/query-keys";

export const useGetUsersWithoutQuery = () => {
	const { data: users = [], isFetching } = useQuery({
		queryKey: [queryKeys.USERS_WITHOUT_QUERY],
		staleTime: Infinity,
		queryFn: () => getUsersWithoutQueryService(),
	});

	return { users, isFetching };
};
