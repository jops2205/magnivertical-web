import { useQuery } from "@tanstack/react-query";
import { getUserService } from "@/api/services/users/get-user-service";
import { queryKeys } from "@/config/query-keys";

export const useGetUser = () => {
	const { data: user, isFetching } = useQuery({
		queryKey: [queryKeys.USER],
		staleTime: Infinity,
		queryFn: getUserService,
	});

	return { user, isFetching };
};
