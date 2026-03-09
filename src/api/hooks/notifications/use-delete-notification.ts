import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteNotificationService } from "@/api/services/notifications/delete-notification-service";
import { queryKeys } from "@/config/query-keys";

export const useDeleteNotification = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteNotification, isPending } = useMutation({
		mutationFn: deleteNotificationService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });

			toast.success("A notificação foi apagada com sucesso!");
		},
	});

	return { deleteNotification, isPending };
};
