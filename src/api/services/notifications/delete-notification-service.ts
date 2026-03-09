import { api } from "@/api";

export const deleteNotificationService = (id: string) => {
	return api.delete(`/notifications/${id}`);
};
