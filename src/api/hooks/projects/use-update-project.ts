import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProjectService } from "@/api/services/projects/update-project-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateProject, isPending } = useMutation({
		mutationFn: updateProjectService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });

			setQueryString({ page: "1" });
			toast.success("A obra foi atualizada com sucesso!");
		},
	});

	return { updateProject, isPending };
};
