import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type CreateFormActionsProps = {
	disableActions: boolean;
	onCancelButtonClick: () => void;
};

export function CreateFormActions({
	disableActions,
	onCancelButtonClick,
}: CreateFormActionsProps) {
	const getSubmitButtonText = () => {
		if (disableActions) {
			return (
				<>
					<Spinner /> A concluir registo
				</>
			);
		}

		return "Registar";
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
