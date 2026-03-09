import { useQuery } from "@tanstack/react-query";
import { getNotificationsService } from "@/api/services/notifications/get-notifications-service";
import { queryKeys } from "@/config/query-keys";

export const useGetNotifications = () => {
	const { data: notifications = [], isFetching } = useQuery({
		queryKey: [queryKeys.NOTIFICATIONS],
		staleTime: Infinity,
		queryFn: getNotificationsService,
	});

	return { notifications, isFetching };
};
