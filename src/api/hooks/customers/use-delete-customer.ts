import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCustomerService } from "@/api/services/customers/delete-customer-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useDeleteCustomer = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: deleteCustomer, isPending } = useMutation({
		mutationFn: deleteCustomerService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.CUSTOMERS] });

			setQueryString({ page: "1" });
			toast.success("O cliente foi apagado com sucesso!");
		},
	});

	return { deleteCustomer, isPending };
};
