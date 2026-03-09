import { PencilIcon } from "lucide-react";
import { DropdownMenuItem } from "../components/ui/dropdown-menu";

type UpdateFormTriggerProps = Omit<
	React.ComponentProps<typeof DropdownMenuItem>,
	"onSelect"
>;

export function UpdateFormTrigger({ ...props }: UpdateFormTriggerProps) {
	return (
		<DropdownMenuItem onSelect={(event) => event.preventDefault()} {...props}>
			<PencilIcon />
			Editar
		</DropdownMenuItem>
	);
}
