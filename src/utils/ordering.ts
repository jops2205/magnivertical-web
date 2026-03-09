type Options = ReadonlyArray<{
	key: string;
	value: "asc" | "desc";
}>;

export const orderingOptions: Options = [
	{
		key: "Ascendente",
		value: "asc",
	},
	{
		key: "Descendente",
		value: "desc",
	},
];
