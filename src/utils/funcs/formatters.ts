export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("pt-PT", {
		style: "currency",
		currency: "EUR",
	}).format(value / 100);
};

export const formatDate = (date: string | Date) => {
	return Intl.DateTimeFormat("pt-PT", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	}).format(date instanceof Date ? date : new Date(date));
};
