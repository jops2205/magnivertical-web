import { z } from "zod";

export const userRole = ["MANAGER", "ASSISTANT", "OPERATOR"] as const;

export const userSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1),
	email: z.email(),
	verified: z.boolean(),
	role: z.enum(userRole),
	createdAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
export type UserRole = User["role"];
