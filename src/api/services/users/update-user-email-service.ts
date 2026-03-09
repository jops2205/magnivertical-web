import { api } from "@/api";

type UpdateUserEmailData = {
	email: string;
};

export const updateUserEmailService = (data: UpdateUserEmailData) => {
	return api.patch("/users/email", data);
};
