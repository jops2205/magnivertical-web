import { z } from "zod";

export const followUpStatus = ["PENDING", "COMPLETED", "CLOSED"] as const;

export const followUpSchema = z.object({
	id: z.uuid(),
	description: z.string().min(1).nullable(),
	status: z.enum(followUpStatus),
	resolvedAt: z.coerce.date().nullable(),
	scheduledAt: z.coerce.date(),
	createdAt: z.coerce.date(),
	userId: z.uuid().nullable(),
	budgetId: z.uuid(),
});

export type FollowUp = z.infer<typeof followUpSchema>;
export type FollowUpStatus = FollowUp["status"];
