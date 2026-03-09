import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTaskService } from "@/api/services/tasks/delete-task-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: deleteTaskService,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.TASKS, queryKeys.ASSIGNMENTS],
			});

			setQueryString({ page: "1" });
			toast.success("A tarefa foi apagada com sucesso!");
		},
	});

	return { deleteTask: mutateAsync, isPending };
};
