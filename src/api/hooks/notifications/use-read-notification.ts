import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotificationService } from "@/api/services/notifications/read-notification-service";
import { queryKeys } from "@/config/query-keys";

export const useReadNotification = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: readNotification, isPending } = useMutation({
		mutationFn: readNotificationService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });
		},
	});

	return { readNotification, isPending };
};
