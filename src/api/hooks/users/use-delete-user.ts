import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUserService } from "@/api/services/users/delete-user-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: deleteUser, isPending } = useMutation({
		mutationFn: deleteUserService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });

			setQueryString({ page: "1" });
			toast.success("O colaborador foi apagado com sucesso!");
		},
	});

	return { deleteUser, isPending };
};
