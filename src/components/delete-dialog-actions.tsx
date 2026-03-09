import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "./ui/alert-dialog";

type DeleteDialogActionsProps = {
	disableActions: boolean;
	onDeleteButtonClick: () => void;
};

export function DeleteDialogActions({
	disableActions,
	onDeleteButtonClick,
}: DeleteDialogActionsProps) {
	return (
		<AlertDialogFooter>
			<AlertDialogCancel disabled={disableActions}>Cancelar</AlertDialogCancel>
			<AlertDialogAction
				onClick={onDeleteButtonClick}
				disabled={disableActions}>
				Apagar
			</AlertDialogAction>
		</AlertDialogFooter>
	);
}
