import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import type { TaskPriority } from "@/api/schemas/task-schema";

type Options = ReadonlyArray<{
	key: string;
	value: TaskPriority;
	icon: React.ReactNode;
}>;

export const taskPriorityOptions: Options = [
	{
		key: "Alta",
		value: "HIGH",
		icon: <ArrowUpIcon className="size-4 text-red-500" />,
	},
	{
		key: "Média",
		value: "MEDIUM",
		icon: <ArrowRightIcon className="size-4 text-yellow-300" />,
	},
	{
		key: "Baixa",
		value: "LOW",
		icon: <ArrowDownIcon className="size-4 text-green-500" />,
	},
];

const taskPriorityLabels = new Map(
	taskPriorityOptions.map(({ key, value }) => [value, key]),
);
export const getTaskPriority = (priority: TaskPriority) => {
	return taskPriorityLabels.get(priority) ?? priority;
};

const taskPriorityIcons = new Map(
	taskPriorityOptions.map(({ icon, value }) => [value, icon]),
);

export const getTaskPriorityIcon = (priority: TaskPriority) => {
	return taskPriorityIcons.get(priority) ?? priority;
};
