import { useGetBudgetsToBeCompleted } from "@/api/hooks/budgets/use-get-budgets-to-be-completed";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { FilterSheetTrigger } from "@/components/filter-sheet-trigger";
import { SearchInput } from "@/components/search-input";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { useQueryString } from "@/hooks/use-query-string";
import { useSearchValue } from "@/hooks/use-search-valeu";
import { useIncompleteBudgets } from "../contexts/incomplete-budgets-provider";
import { incompleteBudgetTableColumns } from "./incomplete-budget-table-columns";

export function IncompleteBudgetsContent() {
	const [queryString] = useQueryString();
	const { page = "1", perPage = "10" } = queryString;

	const [searchValue, setSearchValue] = useSearchValue();
	const { user } = useCurrentUser();

	const { budgets, count, isFetching } = useGetBudgetsToBeCompleted(
		user?.role === "OPERATOR",
	);
	const { setIsBudgetFilterDialogOpen } = useIncompleteBudgets();

	const handleTriggerButtonClick = () => setIsBudgetFilterDialogOpen(true);

	const handleSearchValueChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Serviços</h1>
					<p className="hidden text-zinc-500 md:block dark:text-zinc-400">
						Visualize e acompanhe os serviços em andamento e seus detalhes.
					</p>
				</div>
			</div>
			<div className="flex items-center justify-between gap-4">
				<SearchInput
					value={searchValue}
					onChange={handleSearchValueChange}
					disabled={isFetching}
					placeholder="Procurar por serviço..."
				/>
				<FilterSheetTrigger
					disableTrigger={isFetching}
					onTriggerButtonClick={handleTriggerButtonClick}
				/>
			</div>
			<DataTable
				data={budgets}
				columns={incompleteBudgetTableColumns}
				isLoading={isFetching}
			/>
			<DataTablePagination
				page={Number(page)}
				perPage={Number(perPage)}
				itemsCount={count}
				isLoading={isFetching}
			/>
		</div>
	);
}
