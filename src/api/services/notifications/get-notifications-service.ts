import { z } from "zod";
import { api } from "@/api";
import { notificationSchema } from "@/api/schemas/notification-schema";

const getNotificationsResponseSchema = z.array(notificationSchema);

type GetNotificationsResponse = z.infer<typeof getNotificationsResponseSchema>;

export const getNotificationsService = async () => {
	const { data } = await api.get<GetNotificationsResponse>(
		"/notifications/index",
	);

	return getNotificationsResponseSchema.parse(data);
};
