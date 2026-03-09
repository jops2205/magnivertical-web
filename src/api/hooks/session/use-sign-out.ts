import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signOutService } from "@/api/services/session/sign-out-service";

export const useSignOut = () => {
	const navigate = useNavigate();

	const { mutateAsync: signOut, isPending } = useMutation({
		mutationFn: signOutService,
		onSuccess: () => {
			navigate("/sign-in", { replace: true });
		},
	});

	return { signOut, isPending };
};
