import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCustomerService } from "@/api/services/customers/create-customer-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

export const useCreateCustomer = () => {
	const queryClient = useQueryClient();
	const [_, setQueryString] = useQueryString();

	const { mutateAsync: createCustomer, isPending } = useMutation({
		mutationFn: createCustomerService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.CUSTOMERS] });

			setQueryString({ page: "1" });
			toast.success("O cliente foi registado com sucesso!");
		},
	});

	return { createCustomer, isPending };
};
