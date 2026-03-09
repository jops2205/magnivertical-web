import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUserEmail } from "@/api/hooks/users/use-update-user-email";
import { EmailInputField } from "@/components/_form-fields/inputs/email-input-field";
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

const updateEmailFormSchema = z.object({
	email: z.email("É necessário introduzir um e-mail válido"),
});

type UpdateEmailFormValues = z.infer<typeof updateEmailFormSchema>;

export function UpdateEmailForm() {
	const defaultValues: UpdateEmailFormValues = {
		email: "",
	};

	const form = useForm({
		resolver: zodResolver(updateEmailFormSchema),
		defaultValues,
	});

	const { updateUserEmail, isPending } = useUpdateUserEmail();
	const [isUpdateEmailDialogOpen, setIsUpdateEmailDialogOpen] = useState(false);

	const handleSubmit = async (values: UpdateEmailFormValues) => {
		await updateUserEmail(values);

		setIsUpdateEmailDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateEmailDialogOpen(false);

	return (
		<Dialog
			open={isUpdateEmailDialogOpen}
			onOpenChange={setIsUpdateEmailDialogOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(event) => event.preventDefault()}>
					<MailIcon />
					Alterar e-mail
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus}>
				<DialogHeader>
					<DialogTitle>Alterar endereço de e-mail</DialogTitle>
					<DialogDescription>
						Introduza o seu novo endereço de e-mail.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7">
						<EmailInputField
							form={form}
							path="email"
							label="Novo e-mail"
							placeholder="Introduza o seu novo e-mail"
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
