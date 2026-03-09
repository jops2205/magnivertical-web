import { z } from "zod";
import { addressSchema } from "./address-schema";

export const projectStatus = [
	"PLANNED",
	"IN_PROGRESS",
	"COMPLETED",
	"CANCELED",
] as const;

export const projectSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1),
	code: z.string().min(1),
	status: z.enum(projectStatus),
	startedAt: z.coerce.date(),
	endedAt: z.coerce.date().nullable(),
	customerId: z.uuid().nullable(),
	address: addressSchema,
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectStatus = Project["status"];
