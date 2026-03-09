import { api } from "@/api";

type VerifyUserData = {
	email: string;
};

export const verifyUserService = (data: VerifyUserData) => {
	return api.post("/users/verify/request", data);
};
