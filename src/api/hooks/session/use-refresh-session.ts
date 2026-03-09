import { refreshSessionService } from "@/api/services/session/refresh-session-service";

export const useRefreshSession = () => {
	const refreshSession = refreshSessionService;

	return { refreshSession };
};
