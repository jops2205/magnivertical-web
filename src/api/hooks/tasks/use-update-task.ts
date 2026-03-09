import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTaskService } from "@/api/services/tasks/update-task-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateTask = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateTask, isPending } = useMutation({
		mutationFn: updateTaskService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.TASKS] });

			setQueryString({ page: "1" });
			toast.success("A tarefa foi atualizada com sucesso!");
		},
	});

	return { updateTask, isPending };
};
