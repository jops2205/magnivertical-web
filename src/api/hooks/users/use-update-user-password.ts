import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserPasswordService } from "@/api/services/users/update-user-password-service";
import { queryKeys } from "@/config/query-keys";

export const useUpdateUserPassword = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateUserPassword, isPending } = useMutation({
		mutationFn: updateUserPasswordService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });

			toast.success("A sua palavra-passe foi atualizada com sucesso!");
		},
	});

	return { updateUserPassword, isPending };
};
