import { api } from "@/api";

export const deleteCustomerService = (id: string) => {
	return api.delete(`/customers/${id}`);
};
