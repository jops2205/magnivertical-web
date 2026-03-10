import type { Task, TaskPriority, TaskStatus } from "@/api/schemas/task-schema";
import { DateCell } from "@/components/_table-cells/date-cell";
import { IconCell } from "@/components/_table-cells/icon-cell";
import { UserCell } from "@/components/_table-cells/user-cell";
import type {
	AccessorColumnDef,
	DisplayColumnDef,
} from "@/components/data-table";
import { getTaskPriority, getTaskPriorityIcon } from "@/utils/task-priority";
import { getTaskStatus, getTaskStatusIcon } from "@/utils/task-status";
import { TaskTableRowActions } from "./task-table-row-actions";

const taskAccessorColumns: AccessorColumnDef<Task>[] = [
	{
		accessorKey: "title",
		header: "Título",
		cell: (title) => {
			return <div className="max-w-3xs truncate">{title as string}</div>;
		},
	},
	{
		accessorKey: "description",
		header: "Descrição",
		cell: (description) => {
			return <div className="max-w-md truncate">{description as string}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: (status) => {
			return (
				<IconCell
					text={getTaskStatus(status as TaskStatus)}
					icon={getTaskStatusIcon(status as TaskStatus)}
				/>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Prioridade",
		cell: (priority) => {
			return (
				<IconCell
					text={getTaskPriority(priority as TaskPriority)}
					icon={getTaskPriorityIcon(priority as TaskPriority)}
				/>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Registada em",
		cell: (createdAt) => <DateCell date={createdAt as Date} />,
	},
	{
		accessorKey: "scheduledAt",
		header: "Agendada em",
		cell: (scheduledAt) => <DateCell date={scheduledAt as Date} />,
	},
];

export const executorAccessorColumn: AccessorColumnDef<Task>[] = [
	{
		accessorKey: "executorId",
		header: "Colaborador",
		cell: (executorId) => <UserCell id={executorId as string} />,
	},
];

const taskDisplayColumns: DisplayColumnDef<Task>[] = [
	{
		id: "action",
		cell: (row) => <TaskTableRowActions row={row} />,
	},
];

export const taskTableColumns = [...taskAccessorColumns, ...taskDisplayColumns];
