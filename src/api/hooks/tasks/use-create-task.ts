import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTaskService } from "@/api/services/tasks/create-task-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useCreateTask = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: createTask, isPending } = useMutation({
		mutationFn: createTaskService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.TASKS] });

			setQueryString({ page: "1" });
			toast.success("A tarefa foi registada com sucesso!");
		},
	});

	return { createTask, isPending };
};
