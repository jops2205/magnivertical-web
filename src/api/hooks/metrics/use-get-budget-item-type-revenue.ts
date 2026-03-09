import { useQuery } from "@tanstack/react-query";
import { budgetItemType } from "@/api/schemas/budget-schema";
import { getBudgetItemTypeRevenueService } from "@/api/services/metrics/get-budget-item-type-revenue-service";
import { queryKeys } from "@/config/query-keys";
import { useQueryString } from "@/hooks/use-query-string";

type BudgetItemTypeRevenue = Record<
	(typeof budgetItemType)[number],
	{
		revenue: number;
	}
>;

export const useGetBudgetItemTypeRevenue = () => {
	const [queryString] = useQueryString();

	const { data, isFetching } = useQuery({
		queryKey: [
			queryKeys.BUDGET_ITEM_TYPE_REVENUE,
			...Object.values(queryString),
		],
		staleTime: Infinity,
		queryFn: () => getBudgetItemTypeRevenueService(queryString),
	});

	const defaultItemTypeRevenue = budgetItemType.reduce((items, type) => {
		items[type] = {
			revenue: 0,
		};

		return items;
	}, {} as BudgetItemTypeRevenue);

	return { items: data?.items ?? defaultItemTypeRevenue, isFetching };
};
