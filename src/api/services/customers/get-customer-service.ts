import { api } from "@/api";
import { type Customer, customerSchema } from "@/api/schemas/customer-schema";

type GetCustomerResponse = Customer;

export const getCustomerService = async (id: string) => {
	const { data } = await api.get<GetCustomerResponse>(`/customers/${id}`);

	return customerSchema.parse(data);
};
