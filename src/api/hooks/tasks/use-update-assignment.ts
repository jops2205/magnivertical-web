import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAssignmentService } from "@/api/services/tasks/update-assignment-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateAssignment = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateAssignment, isPending } = useMutation({
		mutationFn: updateAssignmentService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.ASSIGNMENTS] });

			setQueryString({ page: "1" });
			toast.success("A tarefa foi atualizada com sucesso!");
		},
	});

	return { updateAssignment, isPending };
};
