import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";

export function DataTableRowActionsTrigger() {
	return (
		<DropdownMenuTrigger asChild>
			<Button
				variant="ghost"
				size="icon-sm"
				className="flex data-[state=open]:bg-secondary">
				<MoreHorizontalIcon />
			</Button>
		</DropdownMenuTrigger>
	);
}
