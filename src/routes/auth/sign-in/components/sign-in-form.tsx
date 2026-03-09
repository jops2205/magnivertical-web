import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthenticateUser } from "@/api/hooks/session/use-authenticate-user";
import { EmailInputField } from "@/components/_form-fields/inputs/email-input-field";
import { PasswordInputField } from "@/components/_form-fields/inputs/password-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

const signInFormSchema = z.object({
	email: z.email("É necessário introduzir um e-mail válido"),
	password: z.string().min(1, "É necessário introduzir a sua palavra-passe"),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export function SignInForm() {
	const defaultValues: SignInFormValues = {
		email: "",
		password: "",
	};

	const form = useForm({
		resolver: zodResolver(signInFormSchema),
		defaultValues,
	});

	const { authenticateUser, isPending } = useAuthenticateUser();

	const handleSubmit = async (values: SignInFormValues) => {
		await authenticateUser(values);

		form.reset(defaultValues);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-7">
				<EmailInputField
					form={form}
					path="email"
					placeholder="Introduza o seu e-mail"
				/>
				<PasswordInputField
					form={form}
					path="password"
					placeholder="Introduza a sua palavra-passe"
				/>
				<Button className="w-full" disabled={isPending}>
					{!isPending ? (
						"Continuar"
					) : (
						<>
							<Spinner /> A autenticar
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
