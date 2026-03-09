import { z } from "zod";

export const notificationType = ["TASK", "FOLLOW_UP"] as const;

export const notificationSchema = z.object({
	id: z.uuid(),
	title: z.string().min(1),
	description: z.string().min(1),
	type: z.enum(notificationType),
	read: z.boolean(),
	createdAt: z.coerce.date(),
	userId: z.uuid(),
	taskId: z.uuid().nullable(),
	followUpId: z.uuid().nullable(),
});

export type Notification = z.infer<typeof notificationSchema>;
export type NotificationType = Notification["type"];
