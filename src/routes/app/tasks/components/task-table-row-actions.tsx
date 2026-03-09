import { CircleDashedIcon } from "lucide-react";
import { useDeleteTask } from "@/api/hooks/tasks/use-delete-task";
import { useUpdateTaskStatus } from "@/api/hooks/tasks/use-update-task-status";
import type { Task, TaskStatus } from "@/api/schemas/task-schema";
import { DataTableRowActionsTrigger } from "@/components/data-table-row-actions-trigger";
import { DeleteDialogActions } from "@/components/delete-dialog-actions";
import { DeleteDialogTrigger } from "@/components/delete-dialog-trigger";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { useStateTransition } from "@/hooks/use-state-transition";
import { taskStatusOptions } from "@/utils/task-status";
import { useTasks } from "../contexts/tasks-provider";
import { UpdateAssignmentForm } from "./update-assignment-form";
import { UpdateTaskForm } from "./update-task-form";

type TaskTableRowActionsProps = {
	row: Task;
};

export function TaskTableRowActions({ row }: TaskTableRowActionsProps) {
	const { user } = useCurrentUser();
	const { deleteTask, isPending: isDeletePending } = useDeleteTask();

	const { updateTaskStatus, isPending: isUpdateStatusPending } =
		useUpdateTaskStatus();

	const { taskTabValue } = useTasks();

	const { getNextStates } = useStateTransition<TaskStatus>({
		PENDING: ["IN_PROGRESS"],
		IN_PROGRESS: ["DONE", "CANCELED"],
		DONE: [],
		CANCELED: [],
	});

	const isPending = isDeletePending || isUpdateStatusPending;

	const nextStates = getNextStates(row.status);

	const handleStatusTransition = async (
		status: TaskStatus,
		isAllowed: boolean,
	) => {
		if (isAllowed) {
			await updateTaskStatus({ id: row.id, status });
		}
	};

	const handleDeleteButtonClick = async () => await deleteTask(row.id);

	return (
		<DropdownMenu>
			<DataTableRowActionsTrigger />
			<DropdownMenuContent align="end" className="w-40">
				{/* <TaskDetailsCard task={row} /> */}
				{user?.id === row.executorId && nextStates.length > 0 && (
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<CircleDashedIcon className="size-4 text-muted-foreground" />
							Editar status
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuGroup>
								{taskStatusOptions
									.filter(({ value }) => value !== "PENDING")
									.map(({ value, key }) => {
										const isAllowed = nextStates.includes(value);

										return (
											<DropdownMenuItem
												key={value}
												disabled={!isAllowed}
												onClick={() => {
													handleStatusTransition(value, isAllowed);
												}}>
												{key}
											</DropdownMenuItem>
										);
									})}
							</DropdownMenuGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				)}
				{user?.role === "MANAGER" && taskTabValue === "assignments" ? (
					<UpdateAssignmentForm assignment={row} />
				) : (
					<UpdateTaskForm task={row} />
				)}
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DeleteDialogTrigger />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Apagar tarefa</AlertDialogTitle>
							<AlertDialogDescription>
								Esta operação não pode ser desfeita. A tarefa e todas as suas
								informações associadas serão removidas permanentemente.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<DeleteDialogActions
							disableActions={isPending}
							onDeleteButtonClick={handleDeleteButtonClick}
						/>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
