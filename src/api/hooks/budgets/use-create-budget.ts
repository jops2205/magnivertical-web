import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBudgetService } from "@/api/services/budgets/create-budget-service";
import { queryKeys } from "@/config/query-keys";

export const useCreateBudget = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: createBudget, isPending } = useMutation({
		mutationFn: createBudgetService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.BUDGETS] });

			toast.success("O orçamento foi registado com sucesso!");
		},
	});

	return { createBudget, isPending };
};
