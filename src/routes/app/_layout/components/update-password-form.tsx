import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUserPassword } from "@/api/hooks/users/use-update-user-password";
import { PasswordInputField } from "@/components/_form-fields/inputs/password-input-field";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { UpdateFormActions } from "@/components/update-form-actions";

const updatePasswordFormSchema = z.object({
	oldPassword: z
		.string()
		.min(1, "É necessário introduzir a sua palavra-passe atual"),
	newPassword: z
		.string()
		.min(1, "É necessário introduza a sua nova palavra-passe"),
});

type UpdatePasswordFormValues = z.infer<typeof updatePasswordFormSchema>;

export function UpdatePasswordForm() {
	const defaultValues: UpdatePasswordFormValues = {
		oldPassword: "",
		newPassword: "",
	};

	const form = useForm({
		resolver: zodResolver(updatePasswordFormSchema),
		defaultValues,
	});

	const { updateUserPassword, isPending } = useUpdateUserPassword();

	const [isUpdatePasswordDialogOpen, setIsUpdatePasswordDialogOpen] =
		useState(false);

	const handleSubmit = async (values: UpdatePasswordFormValues) => {
		await updateUserPassword(values);

		setIsUpdatePasswordDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdatePasswordDialogOpen(false);

	return (
		<Dialog
			open={isUpdatePasswordDialogOpen}
			onOpenChange={setIsUpdatePasswordDialogOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(event) => event.preventDefault()}>
					<LockKeyholeIcon />
					Alterar palavra-passe
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus}>
				<DialogHeader>
					<DialogTitle>Alterar palavra-passe</DialogTitle>
					<DialogDescription>
						Introduza a sua palavra-passe atual e escolha uma nova.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7">
						<PasswordInputField
							form={form}
							path="oldPassword"
							label="Palavra-passe atual"
							placeholder="Introduza a sua palavra-passe atual"
						/>
						<PasswordInputField
							form={form}
							path="newPassword"
							label="Nova palavra-passe"
							placeholder="Introduza a sua nova palavra-passe"
						/>
						<UpdateFormActions
							disableActions={isPending}
							onCancelButtonClick={handleCancelButtonClick}
						/>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
