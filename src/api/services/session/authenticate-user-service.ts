import { api } from "@/api";

type AuthenticateUserData = {
	email: string;
	password: string;
};

export const authenticateUserService = (data: AuthenticateUserData) => {
	return api.post("/session/request", data);
};
