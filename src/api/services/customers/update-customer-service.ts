import { api } from "@/api";
import type { CreateCustomerData } from "./create-customer-service";

type UpdateCustomerData = CreateCustomerData & {
	id: string;
};

export const updateCustomerService = ({ id, ...data }: UpdateCustomerData) => {
	return api.put(`/customers/${id}`, data);
};
