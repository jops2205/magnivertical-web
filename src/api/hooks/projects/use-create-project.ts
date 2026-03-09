import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProjectService } from "@/api/services/projects/create-project-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: createProject, isPending } = useMutation({
		mutationFn: createProjectService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.PROJECTS] });

			setQueryString({ page: "1" });
			toast.success("A obra foi registada com sucesso!");
		},
	});

	return { createProject, isPending };
};
