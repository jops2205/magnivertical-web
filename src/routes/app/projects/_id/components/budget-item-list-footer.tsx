import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type BudgetItemListFooterProps = {
	disableAction: boolean;
	onRemoveItemButtonClick: () => void;
};

export function BudgetItemListFooter({
	disableAction,
	onRemoveItemButtonClick,
}: BudgetItemListFooterProps) {
	return (
		<div className="flex justify-end">
			{!disableAction && (
				<Button size="sm" variant="secondary" onClick={onRemoveItemButtonClick}>
					<TrashIcon />
					Remover artigo
				</Button>
			)}
		</div>
	);
}
