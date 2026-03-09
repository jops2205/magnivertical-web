import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type BudgetItemListHeaderProps = {
	onInsertItemButtonClick: () => void;
};

export function BudgetItemListHeader({
	onInsertItemButtonClick,
}: BudgetItemListHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<span className="font-semibold text-lg">Artigos</span>
			<Button
				type="button"
				size="sm"
				variant="secondary"
				onClick={onInsertItemButtonClick}>
				<PlusIcon />
				Adicionar artigo
			</Button>
		</div>
	);
}
