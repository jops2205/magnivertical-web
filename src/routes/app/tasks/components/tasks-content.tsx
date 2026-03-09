import { useEffect, useState } from "react";
import { useGetAssignments } from "@/api/hooks/tasks/use-get-assignments";
import { useGetTasks } from "@/api/hooks/tasks/use-get-tasks";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { FilterSheetTrigger } from "@/components/filter-sheet-trigger";
import { SearchInput } from "@/components/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { cn } from "@/lib/utils";
import { useTasks } from "../contexts/tasks-provider";
import { CreateAssignmentForm } from "./create-assignment-form";
import { CreateTaskForm } from "./create-task-form";
import { TaskFilterSheet } from "./task-filter-sheet";
import { executorAccessorColumn, taskTableColumns } from "./task-table-columns";

export function TasksContent() {
	const {
		setIsTaskFilterDialogOpen,
		taskTabValue,
		setTaskTabValue,
		taskQueryString,
		setTaskQueryString,
	} = useTasks();

	const {
		page = "1",
		perPage = "10",
		order,
		search,
		status,
		priority,
		executor,
	} = taskQueryString;

	const { user } = useCurrentUser();

	const {
		tasks,
		count: taskCount,
		isFetching: isFetchingTasks,
	} = useGetTasks({
		page,
		perPage,
		order,
		search,
		status,
		priority,
	});

	const isUserManager = user?.role === "MANAGER";

	const {
		assignments,
		count: assignmentCount,
		isFetching: isFetchingAssignments,
	} = useGetAssignments(
		{
			page,
			perPage,
			order,
			search,
			status,
			priority,
			executor,
		},
		isUserManager,
	);

	const isFetching = isFetchingTasks || isFetchingAssignments;

	const [searchValue, setSearchValue] = useState(search ?? "");

	useEffect(() => setSearchValue(search ?? ""), [search]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const currentValue = search ?? "";

			setTaskQueryString({
				search: searchValue ?? "",
				...(currentValue !== searchValue && { page: "1" }),
			});
		}, 300);

		return () => clearTimeout(timeout);
	}, [search, searchValue, setTaskQueryString]);

	const handleTriggerButtonClick = () => setIsTaskFilterDialogOpen(true);

	const handleSearchValueChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(value);
	};

	const handlePageChange = (page: number) => {
		setTaskQueryString({ page: page.toString() });
	};

	const handlePerPageChange = (perPage: number) => {
		setTaskQueryString({ page: "1", perPage: perPage.toString() });
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl tracking-tight">Tarefas</h1>
					<p className="hidden text-zinc-500 md:block dark:text-zinc-400">
						{isUserManager
							? "Visualize e controle as suas tarefas e atribuições."
							: "Visualize e controle as suas tarefas."}
					</p>
				</div>
				{taskTabValue === "tasks" ? (
					<CreateTaskForm disableTrigger={isFetching} />
				) : (
					<CreateAssignmentForm disableTrigger={isFetching} />
				)}
			</div>
			<div
				className={cn(
					"flex items-center justify-between gap-4 md:justify-start",
					isUserManager && "md:-mb-8 md:gap-2",
					!isUserManager && "md:justify-between",
				)}>
				<SearchInput
					value={searchValue}
					onChange={handleSearchValueChange}
					disabled={isUserManager ? isFetching : isFetchingTasks}
					placeholder={`Procurar por ${taskTabValue === "tasks" ? "tarefa" : "atribuição"}...`}
				/>
				<FilterSheetTrigger
					disableTrigger={isUserManager ? isFetching : isFetchingTasks}
					onTriggerButtonClick={handleTriggerButtonClick}
				/>
			</div>
			{isUserManager ? (
				<Tabs
					value={taskTabValue}
					onValueChange={setTaskTabValue}
					className="gap-4">
					<TabsList className="md:ml-auto md:h-8">
						<TabsTrigger disabled={isFetching} value="tasks">
							Minhas tarefas
						</TabsTrigger>
						<TabsTrigger disabled={isFetching} value="assignments">
							Tarefas atribuídas
						</TabsTrigger>
					</TabsList>
					<TabsContent value="tasks" className="space-y-4">
						<DataTable
							data={tasks}
							columns={taskTableColumns}
							isLoading={isFetching}
						/>
						<DataTablePagination
							page={Number(page)}
							perPage={Number(perPage)}
							itemsCount={taskCount}
							isLoading={isFetching}
							onPageChange={handlePageChange}
							onPerPageChange={handlePerPageChange}
						/>
					</TabsContent>
					<TabsContent value="assignments" className="space-y-4">
						<DataTable
							data={assignments}
							columns={[
								...taskTableColumns.slice(0, 4),
								executorAccessorColumn[0],
								...taskTableColumns.slice(4),
							]}
							isLoading={isFetching}
						/>
						<DataTablePagination
							page={Number(page)}
							perPage={Number(perPage)}
							itemsCount={assignmentCount}
							isLoading={isFetching}
							onPageChange={handlePageChange}
							onPerPageChange={handlePerPageChange}
						/>
					</TabsContent>
				</Tabs>
			) : (
				<>
					<DataTable
						data={tasks}
						columns={taskTableColumns}
						isLoading={isFetchingTasks}
					/>
					<DataTablePagination
						page={Number(page)}
						perPage={Number(perPage)}
						itemsCount={taskCount}
						isLoading={isFetchingTasks}
						onPageChange={handlePageChange}
						onPerPageChange={handlePerPageChange}
					/>
				</>
			)}
			<TaskFilterSheet />
		</div>
	);
}
