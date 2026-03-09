import { api } from "@/api";

export const refreshSessionService = () => {
	return api.get("/session/refresh");
};
