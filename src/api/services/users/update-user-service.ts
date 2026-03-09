import { api } from "@/api";
import type { CreateUserData } from "./create-user-service";

type UpdateUserData = CreateUserData & {
	id: string;
};

export const updateUserService = ({ id, ...data }: UpdateUserData) => {
	return api.put(`/users/${id}`, data);
};
