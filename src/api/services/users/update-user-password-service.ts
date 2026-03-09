import { api } from "@/api";

type UpdateUserPasswordData = {
	oldPassword: string;
	newPassword: string;
};

export const updateUserPasswordService = (data: UpdateUserPasswordData) => {
	return api.patch("/users/password", data);
};
