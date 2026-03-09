import { useGetUsers } from "@/api/hooks/users/use-get-users";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { FilterSheetTrigger } from "@/components/filter-sheet-trigger";
import { SearchInput } from "@/components/search-input";
import { useQueryString } from "@/hooks/use-query-string";
import { useSearchValue } from "@/hooks/use-search-valeu";
import { useUsers } from "../contexts/users-provider";
import { CreateUserForm } from "./create-user-form";
import { UserFilterSheet } from "./user-filter-sheet";
import { userTableColumns } from "./user-table-columns";

export function UsersContent() {
	const [queryString] = useQueryString();
	const { page = "1", perPage = "10" } = queryString;

	const [searchValue, setSearchValue] = useSearchValue();

	const { users, count, isFetching } = useGetUsers();
	const { setIsUserFilterDialogOpen } = useUsers();

	const handleTriggerButtonClick = () => setIsUserFilterDialogOpen(true);

	const handleSearchValueChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Colaboradores</h1>
					<p className="hidden text-zinc-500 md:block dark:text-zinc-400">
						Visualize e edite informações dos membros da sua equipa.
					</p>
				</div>
				<CreateUserForm disableTrigger={isFetching} />
			</div>
			<div className="flex items-center justify-between gap-4">
				<SearchInput
					value={searchValue}
					onChange={handleSearchValueChange}
					disabled={isFetching}
					placeholder="Procurar por colaborador..."
				/>
				<FilterSheetTrigger
					disableTrigger={isFetching}
					onTriggerButtonClick={handleTriggerButtonClick}
				/>
			</div>
			<DataTable
				data={users}
				columns={userTableColumns}
				isLoading={isFetching}
			/>
			<DataTablePagination
				page={Number(page)}
				perPage={Number(perPage)}
				itemsCount={count}
				isLoading={isFetching}
			/>
			<UserFilterSheet />
		</div>
	);
}
