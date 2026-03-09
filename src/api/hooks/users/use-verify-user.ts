import { useMutation } from "@tanstack/react-query";
import { verifyUserService } from "@/api/services/users/verify-user-service";

export const useVerifyUser = () => {
	const { mutateAsync: verifyUser, isPending } = useMutation({
		mutationFn: verifyUserService,
	});

	return { verifyUser, isPending };
};
