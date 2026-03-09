import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProjectService } from "@/api/services/projects/delete-project-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: deleteProject, isPending } = useMutation({
		mutationFn: deleteProjectService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });

			setQueryString({ page: "1" });
			toast.success("A obra foi apagada com sucesso!");
		},
	});

	return { deleteProject, isPending };
};
