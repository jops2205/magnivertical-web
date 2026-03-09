import { useEffect } from "react";
import { Link } from "react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "./components/sign-in-form";

export function SignIn() {
	useEffect(() => {
		document.title = "Iniciar Sessão";
	});

	return (
		<div className="flex min-h-svh items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle>Inicie sessão na sua conta</CardTitle>
						<CardDescription>
							Introduza o seu e-mail e palavra-passe abaixo para iniciar sessão
							na sua conta
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<SignInForm />
							<p className="text-center text-muted-foreground text-sm [&>a:focus]:text-primary [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4 [&>a]:outline-none [&>a]:transition-colors">
								Ao clicar em continuar, concorda com os nossos{" "}
								<Link to="/terms">Termos de Serviço</Link> e{" "}
								<Link to="/terms">Política de Privacidade</Link>.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
