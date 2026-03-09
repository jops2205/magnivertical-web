import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAssignmentService } from "@/api/services/tasks/create-assignment-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useCreateAssignment = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: createAssignment, isPending } = useMutation({
		mutationFn: createAssignmentService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ASSIGNMENTS] });

			setQueryString({ page: "1" });
			toast.success("A tarefa foi atribuída com sucesso!");
		},
	});

	return { createAssignment, isPending };
};
