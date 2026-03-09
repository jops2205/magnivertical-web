import { Button } from "./ui/button";
import { SheetFooter } from "./ui/sheet";

type FilterSheetActionsProps = {
	disableActions: boolean;
	onResetButtonClick: () => void;
};

export function FilterSheetActions({
	disableActions,
	onResetButtonClick,
}: FilterSheetActionsProps) {
	return (
		<SheetFooter>
			<Button>Ver Resultados</Button>
			<Button
				type="button"
				variant="outline"
				disabled={disableActions}
				onClick={onResetButtonClick}>
				Remover
			</Button>
		</SheetFooter>
	);
}
