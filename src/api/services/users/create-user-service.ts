import { api } from "@/api";
import type { UserRole } from "@/api/schemas/user-schema";

export type CreateUserData = {
	name: string;
	email: string;
	role: UserRole;
};

export const createUserService = (data: CreateUserData) => {
	return api.post("/users", data);
};
