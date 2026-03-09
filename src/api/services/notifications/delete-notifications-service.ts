import { api } from "@/api";

export const deleteNotificationsService = () => {
	return api.delete("/notifications");
};
