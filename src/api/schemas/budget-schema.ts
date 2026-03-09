import { z } from "zod";

export const budgetStatus = [
	"DRAFT",
	"SENT",
	"UNDER_REVIEW",
	"NOT_REQUESTED",
	"REQUESTED",
	"IN_PRODUCTION",
	"PENDING_COMPLETION",
	"COMPLETED",
] as const;

export const budgetItemType = [
	"ALUMINUM",
	"IRON",
	"GLASS",
	"INOX",
	"COMPOSITE",
	"SHEET",
] as const;

export const budgetItemSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1),
	price: z.int(),
	quantity: z.int(),
	type: z.enum(budgetItemType),
});

export const budgetSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1),
	status: z.enum(budgetStatus),
	percentageDiscount: z.int(),
	attachmentsUrl: z.url(),
	createdAt: z.coerce.date(),
	userId: z.uuid().nullable(),
	projectId: z.uuid(),
	items: z.array(budgetItemSchema).min(1),
});

export type Budget = z.infer<typeof budgetSchema>;
export type BudgetStatus = Budget["status"];

export type BudgetItem = z.infer<typeof budgetItemSchema>;
export type BudgetItemType = BudgetItem["type"];
