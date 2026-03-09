import { z } from "zod";

export const districts = [
	"ACORES",
	"AVEIRO",
	"BEJA",
	"BRAGA",
	"BRAGANCA",
	"CASTELO_BRANCO",
	"COIMBRA",
	"EVORA",
	"FARO",
	"GUARDA",
	"LEIRIA",
	"LISBOA",
	"MADEIRA",
	"PORTALEGRE",
	"PORTO",
	"SANTAREM",
	"SETUBAL",
	"VIANA_DO_CASTELO",
	"VILA_REAL",
	"VISEU",
] as const;

export const addressPostalCodeRegex: RegExp = /^\d{4}-\d{3}$/;

export const addressSchema = z.object({
	street: z.string().min(1),
	postalCode: z.string().regex(addressPostalCodeRegex),
	complement: z.string().nullable(),
	district: z.enum(districts),
});

export type Address = z.infer<typeof addressSchema>;
export type District = Address["district"];
