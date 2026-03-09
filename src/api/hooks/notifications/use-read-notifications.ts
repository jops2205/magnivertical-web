import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotificationsService } from "@/api/services/notifications/read-notifications-service";
import { queryKeys } from "@/config/query-keys";

export const useReadNotifications = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: readNotifications, isPending } = useMutation({
		mutationFn: readNotificationsService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });
		},
	});

	return { readNotifications, isPending };
};
