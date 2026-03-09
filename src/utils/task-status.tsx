import {
	CheckCircleIcon,
	CircleIcon,
	CircleOffIcon,
	TimerIcon,
} from "lucide-react";
import type { TaskStatus } from "@/api/schemas/task-schema";

type Options = ReadonlyArray<{
	key: string;
	value: TaskStatus;
	icon: React.ReactNode;
}>;

export const taskStatusOptions: Options = [
	{
		key: "Pendente",
		value: "PENDING",
		icon: <CircleIcon className="size-4 text-blue-500" />,
	},
	{
		key: "Em andamento",
		value: "IN_PROGRESS",
		icon: <TimerIcon className="size-4 text-yellow-300" />,
	},
	{
		key: "Concluída",
		value: "DONE",
		icon: <CheckCircleIcon className="size-4 text-green-500" />,
	},
	{
		key: "Cancelada",
		value: "CANCELED",
		icon: <CircleOffIcon className="size-4 text-red-500" />,
	},
];

const taskStatusLabels = new Map(
	taskStatusOptions.map(({ key, value }) => [value, key]),
);

export const getTaskStatus = (status: TaskStatus) => {
	return taskStatusLabels.get(status) ?? status;
};

const taskStatusIcons = new Map(
	taskStatusOptions.map(({ icon, value }) => [value, icon]),
);

export const getTaskStatusIcon = (status: TaskStatus) => {
	return taskStatusIcons.get(status) ?? status;
};
