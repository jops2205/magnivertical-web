import { api } from "@/api";

export const deleteUserService = (id: string) => {
	return api.delete(`/users/${id}`);
};
