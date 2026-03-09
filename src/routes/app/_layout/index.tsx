import { isAxiosError } from "axios";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "@/api";
import { useRefreshSession } from "@/api/hooks/session/use-refresh-session";
import { CurrentUserProvider } from "@/contexts/current-user-provider";
import { AppLayoutContent } from "./components/app-layout-content";

export function AppLayout() {
	const navigate = useNavigate();
	const { refreshSession } = useRefreshSession();

	let isRefreshing = false;

	useLayoutEffect(() => {
		const interceptorId = api.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error) => {
				if (isAxiosError(error)) {
					const statusCode = error.response?.status;
					const data = error.response?.data;
					const requestConfig = error.config;

					if (statusCode === 401 && !("error" in data) && !isRefreshing) {
						isRefreshing = true;

						try {
							await refreshSession();

							isRefreshing = false;

							if (requestConfig) {
								return api(requestConfig);
							}
						} catch {
							isRefreshing = false;

							navigate("/sign-in", { replace: true });
						}
					}
				}

				return Promise.reject(error);
			},
		);

		return () => api.interceptors.response.eject(interceptorId);
	}, [navigate, isRefreshing, refreshSession]);

	return (
		<CurrentUserProvider>
			<AppLayoutContent />
		</CurrentUserProvider>
	);
}
