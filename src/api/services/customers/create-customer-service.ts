import { api } from "@/api";
import type { Address } from "@/api/schemas/address-schema";
import type { CustomerType } from "@/api/schemas/customer-schema";

export type CreateCustomerData = {
	name: string;
	email: string;
	taxpayer: string;
	phone: string;
	type: CustomerType;
	address: Address;
};

export const createCustomerService = (data: CreateCustomerData) => {
	return api.post("/customers", data);
};
