import axios from "axios";
import { env } from "../config/env";

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
});

if (env.VITE_ENABLE_API_DELAY) {
	api.interceptors.response.use(async (response) => {
		const API_DELAY = 3000;

		await new Promise((resolve) => setTimeout(resolve, API_DELAY));

		return response;
	});
}
