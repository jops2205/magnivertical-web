import { TrashIcon } from "lucide-react";
import { DropdownMenuItem } from "../components/ui/dropdown-menu";

type DeleteDialogTriggerProps = Omit<
	React.ComponentProps<typeof DropdownMenuItem>,
	"variant" | "onSelect"
>;

export function DeleteDialogTrigger({ ...props }: DeleteDialogTriggerProps) {
	return (
		<DropdownMenuItem
			variant="destructive"
			onSelect={(event) => event.preventDefault()}
			{...props}>
			<TrashIcon />
			Apagar
		</DropdownMenuItem>
	);
}
