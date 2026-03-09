import { api } from "@/api";

export const signOutService = () => {
	return api.post("/session/out");
};
