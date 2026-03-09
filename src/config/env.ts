import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z.url({
		protocol: /^https?$/,
		hostname: z.regexes.hostname,
	}),
	VITE_ENABLE_API_DELAY: z.stringbool().default(false),
});

export const env = envSchema.parse(import.meta.env);
