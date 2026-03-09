import { useGetCustomers } from "@/api/hooks/customers/use-get-customers";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { FilterSheetTrigger } from "@/components/filter-sheet-trigger";
import { SearchInput } from "@/components/search-input";
import { useQueryString } from "@/hooks/use-query-string";
import { useSearchValue } from "@/hooks/use-search-valeu";
import { useCustomers } from "../contexts/customers-provider";
import { CreateCustomerForm } from "./create-customer-form";
import { CustomerFilterSheet } from "./customer-filter-sheet";
import { customerTableColumns } from "./customer-table-columns";

export function CustomersContent() {
	const [queryString] = useQueryString();
	const { page = "1", perPage = "10" } = queryString;

	const [searchValue, setSearchValue] = useSearchValue();

	const { customers, count, isFetching } = useGetCustomers();
	const { setIsCustomerFilterDialogOpen } = useCustomers();

	const handleTriggerButtonClick = () => setIsCustomerFilterDialogOpen(true);

	const handleSearchValueChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Clientes</h1>
					<p className="hidden text-zinc-500 md:block dark:text-zinc-400">
						Visualização e gestão detalhada dos seus clientes.
					</p>
				</div>
				<CreateCustomerForm disableTrigger={isFetching} />
			</div>
			<div className="flex items-center justify-between gap-4">
				<SearchInput
					value={searchValue}
					onChange={handleSearchValueChange}
					disabled={isFetching}
					placeholder="Procurar por cliente..."
				/>
				<FilterSheetTrigger
					disableTrigger={isFetching}
					onTriggerButtonClick={handleTriggerButtonClick}
				/>
			</div>
			<DataTable
				data={customers}
				columns={customerTableColumns}
				isLoading={isFetching}
			/>
			<DataTablePagination
				page={Number(page)}
				perPage={Number(perPage)}
				itemsCount={count}
				isLoading={isFetching}
			/>
			<CustomerFilterSheet />
		</div>
	);
}
