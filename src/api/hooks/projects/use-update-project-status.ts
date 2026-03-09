import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProjectStatusService } from "@/api/services/projects/update-project-status-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateProjectStatus = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateProjectStatus, isPending } = useMutation({
		mutationFn: updateProjectStatusService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });

			setQueryString({ page: "1" });
			toast.success("O status da obra foi atualizado com sucesso!");
		},
	});

	return { updateProjectStatus, isPending };
};
