import { useQuery } from "@tanstack/react-query";
import { getProjectFollowUpsService } from "@/api/services/projects/get-project-follow-ups-service";
import { queryKeys } from "@/config/query-keys";

export const useGetProjectFollowUps = (id: string) => {
	const { data: followUps = [], isFetching } = useQuery({
		queryKey: [queryKeys.FOLLOW_UPS, id],
		staleTime: Infinity,
		queryFn: () => getProjectFollowUpsService(id),
	});

	return { followUps, isFetching };
};
