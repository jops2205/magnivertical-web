import { checkAuthenticationService } from "@/api/services/session/check-authentication-service";

export const useCheckAuthentication = () => {
	const checkAuthentication = checkAuthenticationService;

	return { checkAuthentication };
};
