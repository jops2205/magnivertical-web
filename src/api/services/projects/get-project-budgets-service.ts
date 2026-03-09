import { z } from "zod";
import { api } from "@/api";
import { budgetSchema } from "@/api/schemas/budget-schema";

const getProjectBudgetsResponseSchema = z.array(budgetSchema);

type GetProjectBudgetsResponse = z.infer<
	typeof getProjectBudgetsResponseSchema
>;

export const getProjectBudgetsService = async (id: string) => {
	const { data } = await api.get<GetProjectBudgetsResponse>(
		`/projects/budgets/index/${id}`,
	);

	return getProjectBudgetsResponseSchema.parse(data);
};
