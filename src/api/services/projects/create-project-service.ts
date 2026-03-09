import { api } from "@/api";
import type { Address } from "@/api/schemas/address-schema";

export type CreateProjectData = {
	name: string;
	address: Address;
	customerId: string;
};

export const createProjectService = (data: CreateProjectData) => {
	return api.post("/projects", data);
};
