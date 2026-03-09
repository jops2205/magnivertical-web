import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "@/api/hooks/users/use-update-user";
import type { User } from "@/api/schemas/user-schema";
import { EmailInputField } from "@/components/_form-fields/inputs/email-input-field";
import { NameInputField } from "@/components/_form-fields/inputs/name-input-field";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { UpdateFormActions } from "@/components/update-form-actions";
import { UpdateFormTrigger } from "@/components/update-form-trigger";
import { useUsers } from "../contexts/users-provider";
import {
	type CreateUserFormValues,
	createUserFormSchema,
} from "./create-user-form";
import { UserRoleSelectField } from "./user-role-select-field";

export const updateUserFormSchema = createUserFormSchema;

export type UpdateUserFormValues = CreateUserFormValues;

type UpdateUserFormProps = {
	user: User;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
	const defaultValues: UpdateUserFormValues = {
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const form = useForm({
		resolver: zodResolver(updateUserFormSchema),
		defaultValues,
	});

	const { updateUser, isPending } = useUpdateUser();
	const { isUpdateUserDialogOpen, setIsUpdateUserDialogOpen } = useUsers();

	const handleSubmit = async (values: UpdateUserFormValues) => {
		await updateUser({ id: user.id, ...values });

		setIsUpdateUserDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateUserDialogOpen(false);

	return (
		<Dialog
			open={isUpdateUserDialogOpen}
			onOpenChange={setIsUpdateUserDialogOpen}>
			<DialogTrigger asChild>
				<UpdateFormTrigger />
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}>
				<DialogHeader>
					<DialogTitle>Editar dados do colaborador</DialogTitle>
					<DialogDescription>
						Altere as informações do colaborador conforme necessário.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7">
						<NameInputField form={form} path="name" />
						<EmailInputField form={form} path="email" />
						<UserRoleSelectField form={form} path="role" />
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
