import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { RouterProvider } from "react-router";
import { toast } from "sonner";
import { Toaster } from "./components/ui/toast";
import { storageKeys } from "./config/storage-keys";
import { ThemeProvider } from "./contexts/theme-provider";
import { router } from "./routes";

export function App() {
	const [queryClient] = useState(() => {
		return new QueryClient({
			defaultOptions: {
				mutations: {
					onError(error) {
						if (isAxiosError(error)) {
							const data = error.response?.data;

							if ("error" in data) {
								toast.error(data.error);
							}
						}
					},
				},
			},
		});
	});

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storageKey={storageKeys.THEME} defaultTheme="light">
				<RouterProvider router={router} />
				<Toaster richColors />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
