import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateFollowUpService } from "@/api/services/follow-ups/update-follow-up-service";
import { queryKeys } from "@/config/query-keys";

export const useUpdateFollowUp = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateFollowUp, isPending } = useMutation({
		mutationFn: updateFollowUpService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.FOLLOW_UPS] });

			toast.success("O follow-up foi atualizado com sucesso!");
		},
	});

	return { updateFollowUp, isPending };
};
