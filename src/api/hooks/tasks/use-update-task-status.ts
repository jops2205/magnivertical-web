import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTaskStatusService } from "@/api/services/tasks/update-task-status-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateTaskStatus = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateTaskStatus, isPending } = useMutation({
		mutationFn: updateTaskStatusService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.TASKS] });

			setQueryString({ page: "1" });
			toast.success("O status da tarefa foi atualizado com sucesso!");
		},
	});

	return { updateTaskStatus, isPending };
};
