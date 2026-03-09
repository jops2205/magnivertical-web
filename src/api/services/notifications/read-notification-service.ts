import { api } from "@/api";

export const readNotificationService = (id: string) => {
	return api.patch(`/notifications/read/${id}`);
};
