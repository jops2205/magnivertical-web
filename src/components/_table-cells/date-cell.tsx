import { formatDate } from "@/utils/funcs/formatters";

type DateCellProps = {
	date: Date;
};

export function DateCell({ date }: DateCellProps) {
	return <>{formatDate(date)}</>;
}
