import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserService } from "@/api/services/users/update-user-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateUser, isPending } = useMutation({
		mutationFn: updateUserService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });

			setQueryString({ page: "1" });
			toast.success("O colaborador foi atualizado com sucesso!");
		},
	});

	return { updateUser, isPending };
};
