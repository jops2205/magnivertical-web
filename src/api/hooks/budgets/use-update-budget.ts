import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBudgetService } from "@/api/services/budgets/update-budget-service";
import { queryKeys } from "@/config/query-keys";

export const useUpdateBudget = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateBudget, isPending } = useMutation({
		mutationFn: updateBudgetService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.BUDGETS] });

			toast.success("O orçamento foi atualizado com sucesso!");
		},
	});

	return { updateBudget, isPending };
};
