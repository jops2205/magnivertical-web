import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBudgetService } from "@/api/services/budgets/delete-budget-service";
import { queryKeys } from "@/config/query-keys";

export const useDeleteBudget = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteBudget, isPending } = useMutation({
		mutationFn: deleteBudgetService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.BUDGETS] });

			toast.success("O orçamento foi apagado com sucesso!");
		},
	});

	return { deleteBudget, isPending };
};
