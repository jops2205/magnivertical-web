import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authenticateUserService } from "@/api/services/session/authenticate-user-service";

export const useAuthenticateUser = () => {
	const { mutateAsync: authenticateUser, isPending } = useMutation({
		mutationFn: authenticateUserService,
		onSuccess: () => {
			toast.success(
				"Verifique o seu e-mail. O link para aceder à sua conta foi enviado.",
			);
		},
	});

	return { authenticateUser, isPending };
};
