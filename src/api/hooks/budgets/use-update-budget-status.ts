import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBudgetStatusService } from "@/api/services/budgets/update-budget-status-service";
import { queryKeys } from "@/config/query-keys";

export const useUpdateBudgetStatus = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateBudgetStatus, isPending } = useMutation({
		mutationFn: updateBudgetStatusService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.BUDGETS] });

			toast.success("O status do orçamento foi atualizado com sucesso!");
		},
	});

	return { updateBudgetStatus, isPending };
};
