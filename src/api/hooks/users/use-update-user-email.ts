import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserEmailService } from "@/api/services/users/update-user-email-service";
import { queryKeys } from "@/config/query-keys";

export const useUpdateUserEmail = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateUserEmail, isPending } = useMutation({
		mutationFn: updateUserEmailService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });

			toast.success("O seu endereço de e-mail foi atualizado com sucesso!");
		},
	});

	return { updateUserEmail, isPending };
};
