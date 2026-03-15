import { api } from "@/api";

export const checkAuthenticationService = () => {
	return api.get("/session/check");
};
