import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateUser } from "@/api/hooks/users/use-create-user";
import { userRole } from "@/api/schemas/user-schema";
import { EmailInputField } from "@/components/_form-fields/inputs/email-input-field";
import { NameInputField } from "@/components/_form-fields/inputs/name-input-field";
import { CreateFormActions } from "@/components/create-form-actions";
import { CreateFormTrigger } from "@/components/create-form-trigger";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useUsers } from "../contexts/users-provider";
import { UserRoleSelectField } from "./user-role-select-field";

export const createUserFormSchema = z.object({
	name: z.string().min(1, "É necessário introduzir o nome"),
	email: z.email("É necessário introduzir um e-mail válido"),
	role: z.enum(userRole),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;

type CreateUserFormProps = {
	disableTrigger: boolean;
};

export function CreateUserForm({ disableTrigger }: CreateUserFormProps) {
	const defaultValues: CreateUserFormValues = {
		name: "",
		email: "",
		role: "ASSISTANT",
	};

	const form = useForm({
		resolver: zodResolver(createUserFormSchema),
		defaultValues,
	});

	const { createUser, isPending } = useCreateUser();
	const { isCreateUserDialogOpen, setIsCreateUserDialogOpen } = useUsers();

	const handleSubmit = async (values: CreateUserFormValues) => {
		await createUser(values);

		setIsCreateUserDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsCreateUserDialogOpen(false);

	return (
		<Dialog
			open={isCreateUserDialogOpen}
			onOpenChange={setIsCreateUserDialogOpen}>
			<CreateFormTrigger target="colaborador" disableTrigger={disableTrigger} />
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus}>
				<DialogHeader>
					<DialogTitle>Registar colaborador</DialogTitle>
					<DialogDescription>
						Preencha os dados abaixo para registar um novo colaborador.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7">
						<NameInputField form={form} path="name" />
						<EmailInputField form={form} path="email" />
						<UserRoleSelectField form={form} path="role" />
						<CreateFormActions
							disableActions={isPending}
							onCancelButtonClick={handleCancelButtonClick}
						/>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
