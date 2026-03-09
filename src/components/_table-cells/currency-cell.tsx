import { formatCurrency } from "@/utils/funcs/formatters";

type CurrencyCellProps = {
	value: number;
};

export function CurrencyCell({ value }: CurrencyCellProps) {
	return <>{formatCurrency(value)}</>;
}
