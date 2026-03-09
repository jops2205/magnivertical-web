import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUserService } from "@/api/services/users/create-user-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: createUser, isPending } = useMutation({
		mutationFn: createUserService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });

			setQueryString({ page: "1" });
			toast.success("O colaborador foi registado com sucesso!");
		},
	});

	return { createUser, isPending };
};
