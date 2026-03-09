import { useDeleteCustomer } from "@/api/hooks/customers/use-delete-customer";
import type { Customer } from "@/api/schemas/customer-schema";
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
import { useCurrentUser } from "@/contexts/current-user-provider";
import { UpdateCustomerForm } from "./update-customer-form";

type CustomerTableRowActionsProps = {
	row: Customer;
};

export function CustomerTableRowActions({ row }: CustomerTableRowActionsProps) {
	const { user } = useCurrentUser();
	const { deleteCustomer, isPending } = useDeleteCustomer();

	const handleDeleteButtonClick = async () => await deleteCustomer(row.id);

	return (
		<>
			{user?.role === "MANAGER" ? (
				<DropdownMenu>
					<DataTableRowActionsTrigger />
					<DropdownMenuContent align="end" className="w-40">
						<UpdateCustomerForm customer={row} />
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<DeleteDialogTrigger />
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Apagar cliente</AlertDialogTitle>
									<AlertDialogDescription>
										Esta operação não pode ser desfeita. O cliente e todas as
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
			) : (
				<div className="size-8" />
			)}
		</>
	);
}
