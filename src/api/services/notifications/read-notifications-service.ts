import { api } from "@/api";

export const readNotificationsService = () => {
	return api.patch("/notifications/read");
};
