import { useGetProjects } from "@/api/hooks/projects/use-get-projects";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { FilterSheetTrigger } from "@/components/filter-sheet-trigger";
import { SearchInput } from "@/components/search-input";
import { useQueryString } from "@/hooks/use-query-string";
import { useSearchValue } from "@/hooks/use-search-valeu";
import { useProjects } from "../contexts/projects-provider";
import { CreateProjectForm } from "./create-project-form";
import { ProjectFilterSheet } from "./project-filter-sheet";
import { projectTableColumns } from "./project-table-columns";

export function ProjectsContent() {
	const [queryString] = useQueryString();
	const { page = "1", perPage = "10" } = queryString;

	const [searchValue, setSearchValue] = useSearchValue();

	const { projects, count, isFetching } = useGetProjects();
	const { setIsProjectFilterDialogOpen } = useProjects();

	const handleTriggerButtonClick = () => setIsProjectFilterDialogOpen(true);

	const handleSearchValueChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Obras</h1>
					<p className="hidden text-zinc-500 md:block dark:text-zinc-400">
						Acompanhamento e gestão detalhada das suas obras.
					</p>
				</div>
				<CreateProjectForm disableTrigger={isFetching} />
			</div>
			<div className="flex items-center justify-between gap-4">
				<SearchInput
					value={searchValue}
					onChange={handleSearchValueChange}
					disabled={isFetching}
					placeholder="Procurar por obra..."
				/>
				<FilterSheetTrigger
					disableTrigger={isFetching}
					onTriggerButtonClick={handleTriggerButtonClick}
				/>
			</div>
			<DataTable
				data={projects}
				columns={projectTableColumns}
				isLoading={isFetching}
			/>
			<DataTablePagination
				page={Number(page)}
				perPage={Number(perPage)}
				itemsCount={count}
				isLoading={isFetching}
			/>
			<ProjectFilterSheet />
		</div>
	);
}
