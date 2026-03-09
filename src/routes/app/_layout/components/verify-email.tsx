import { MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useVerifyUser } from "@/api/hooks/users/use-verify-user";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/contexts/current-user-provider";

export function VerifyEmail() {
	const { user } = useCurrentUser();
	const { verifyUser, isPending } = useVerifyUser();

	const [delay, setDelay] = useState(0);

	useEffect(() => {
		if (delay > 0) {
			const timeout = setTimeout(() => setDelay(delay - 1), 1000);

			return () => clearTimeout(timeout);
		}
	}, [delay]);

	const handleVerifyEmail = async () => {
		if (user) {
			await verifyUser(
				{
					email: user.email,
				},
				{
					onSuccess: () => {
						toast.success(
							"Verifique o seu e-mail. O link para verificar a sua conta foi enviado.",
						);

						setDelay(60);
					},
				},
			);
		}
	};

	const getButtonText = () => {
		if (isPending) {
			return (
				<>
					<Spinner />A enviar
				</>
			);
		}

		if (delay > 0) {
			return `Tente novamente em ${delay} segundos`;
		}

		return "Reenviar e-mail de verificação";
	};

	return (
		<div className="flex min-h-svh items-center justify-center px-6">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Confirme o seu e-mail</CardTitle>
					<CardDescription>
						Para continuar a utilizar a nossa plataforma, confirme o seu
						endereço de e-mail.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center gap-3.5 rounded-lg border p-3.5">
						<div className="flex size-9 items-center justify-center rounded-full bg-secondary">
							<MailIcon className="size-4.5" />
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-muted-foreground text-xs">
								Endereço de e-mail
							</span>
							<span className="font-semibold text-sm">{user?.email}</span>
						</div>
					</div>
					<Button
						onClick={handleVerifyEmail}
						disabled={isPending || delay > 0}
						className="w-full">
						{getButtonText()}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
