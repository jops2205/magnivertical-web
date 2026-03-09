import type { District } from "@/api/schemas/address-schema";

type Options = ReadonlyArray<{
	key: string;
	value: District;
}>;

export const districtOptions: Options = [
	{
		key: "Açores",
		value: "ACORES",
	},
	{
		key: "Aveiro",
		value: "AVEIRO",
	},
	{
		key: "Beja",
		value: "BEJA",
	},
	{
		key: "Braga",
		value: "BRAGA",
	},
	{
		key: "Bragança",
		value: "BRAGANCA",
	},
	{
		key: "Castelo Branco",
		value: "CASTELO_BRANCO",
	},
	{
		key: "Coimbra",
		value: "COIMBRA",
	},
	{
		key: "Évora",
		value: "EVORA",
	},
	{
		key: "Faro",
		value: "FARO",
	},
	{
		key: "Guarda",
		value: "GUARDA",
	},
	{
		key: "Leiria",
		value: "LEIRIA",
	},
	{
		key: "Lisboa",
		value: "LISBOA",
	},
	{
		key: "Madeira",
		value: "MADEIRA",
	},
	{
		key: "Portalegre",
		value: "PORTALEGRE",
	},
	{
		key: "Porto",
		value: "PORTO",
	},
	{
		key: "Santarém",
		value: "SANTAREM",
	},
	{
		key: "Setúbal",
		value: "SETUBAL",
	},
	{
		key: "Viana do Castelo",
		value: "VIANA_DO_CASTELO",
	},
	{
		key: "Vila Real",
		value: "VILA_REAL",
	},
	{
		key: "Viseu",
		value: "VISEU",
	},
];

const districtLabels = new Map(
	districtOptions.map(({ key, value }) => [value, key]),
);

export const getDistrict = (district: District) => {
	return districtLabels.get(district) ?? district;
};
