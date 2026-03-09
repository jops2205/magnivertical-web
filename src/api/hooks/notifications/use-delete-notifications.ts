import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteNotificationsService } from "@/api/services/notifications/delete-notifications-service";
import { queryKeys } from "@/config/query-keys";

export const useDeleteNotifications = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteNotifications, isPending } = useMutation({
		mutationFn: deleteNotificationsService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFICATIONS] });

			toast.success("Todas as notificações foram apagadas com sucesso!");
		},
	});

	return { deleteNotifications, isPending };
};
