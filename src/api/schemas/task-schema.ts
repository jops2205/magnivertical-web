import { z } from "zod";

export const taskStatus = [
	"PENDING",
	"IN_PROGRESS",
	"DONE",
	"CANCELED",
] as const;

export const taskPriority = ["HIGH", "MEDIUM", "LOW"] as const;

export const taskSchema = z.object({
	id: z.uuid(),
	title: z.string().min(1),
	description: z.string().min(1),
	status: z.enum(taskStatus),
	priority: z.enum(taskPriority),
	scheduledAt: z.coerce.date(),
	startedAt: z.coerce.date().nullable(),
	completedAt: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
	creatorId: z.uuid(),
	executorId: z.uuid().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = Task["status"];
export type TaskPriority = Task["priority"];
