import { useDeleteUser } from "@/api/hooks/users/use-delete-user";
import type { User } from "@/api/schemas/user-schema";
import { DataTableRowActionsTrigger } from "@/components/data-table-row-actions-trigger";
import { DeleteDialogActions } from "@/components/delete-dialog-actions";
import { DeleteDialogTrigger } from "@/components/delete-dialog-trigger";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { UpdateUserForm } from "./update-user-form";

type UserTableRowActionsProps = {
	row: User;
};

export function UserTableRowActions({ row }: UserTableRowActionsProps) {
	const { deleteUser, isPending } = useDeleteUser();

	const handleDeleteButtonClick = async () => await deleteUser(row.id);

	return (
		<DropdownMenu>
			<DataTableRowActionsTrigger />
			<DropdownMenuContent align="end" className="w-40">
				<UpdateUserForm user={row} />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DeleteDialogTrigger />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Apagar colaborador</AlertDialogTitle>
							<AlertDialogDescription>
								Esta operação não pode ser desfeita. O colaborador e todas as
								suas informações associadas serão removidos permanentemente.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<DeleteDialogActions
							disableActions={isPending}
							onDeleteButtonClick={handleDeleteButtonClick}
						/>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
