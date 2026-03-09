import { z } from "zod";
import { addressSchema } from "./address-schema";

export const customerType = ["BUSINESS", "INDIVIDUAL"] as const;

export const customerTaxpayerRegex: RegExp = /^\d{3} \d{3} \d{3}$/;
export const customerPhoneRegex: RegExp = /^\d{3} \d{3} \d{3}$/;

export const customerSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1),
	email: z.email(),
	taxpayer: z.string().regex(customerTaxpayerRegex),
	phone: z.string().regex(customerPhoneRegex),
	type: z.enum(customerType),
	address: addressSchema,
	createdAt: z.coerce.date(),
});

export type Customer = z.infer<typeof customerSchema>;
export type CustomerType = Customer["type"];
