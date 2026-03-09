import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCustomerService } from "@/api/services/customers/update-customer-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useUpdateCustomer = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: updateCustomer, isPending } = useMutation({
		mutationFn: updateCustomerService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.CUSTOMERS] });

			setQueryString({ page: "1" });
			toast.success("O cliente foi atualizado com sucesso!");
		},
	});

	return { updateCustomer, isPending };
};
