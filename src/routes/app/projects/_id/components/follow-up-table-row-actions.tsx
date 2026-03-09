import type { FollowUp } from "@/api/schemas/follow-up-schema";
import { DataTableRowActionsTrigger } from "@/components/data-table-row-actions-trigger";
import {
	DropdownMenu,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { UpdateFollowUpForm } from "./update-follow-up-form";

type FollowUpTableRowActionsProps = {
	row: FollowUp;
};

export function FollowUpTableRowActions({ row }: FollowUpTableRowActionsProps) {
	return (
		<>
			{row.status === "PENDING" ? (
				<DropdownMenu>
					<DataTableRowActionsTrigger />
					<DropdownMenuContent align="end" className="w-40">
						<UpdateFollowUpForm followUp={row} />
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<div className="size-8" />
			)}
		</>
	);
}
