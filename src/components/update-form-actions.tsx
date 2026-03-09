import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type UpdateFormActionsProps = {
	disableActions: boolean;
	onCancelButtonClick: () => void;
};

export function UpdateFormActions({
	disableActions,
	onCancelButtonClick,
}: UpdateFormActionsProps) {
	const getSubmitButtonText = () => {
		if (disableActions) {
			return (
				<>
					<Spinner /> A guardar alterações
				</>
			);
		}

		return "Salvar";
	};

	return (
		<div className="flex justify-end gap-2">
			<Button
				type="button"
				variant="outline"
				disabled={disableActions}
				onClick={onCancelButtonClick}>
				Cancelar
			</Button>
			<Button type="submit" disabled={disableActions}>
				{getSubmitButtonText()}
			</Button>
		</div>
	);
}
