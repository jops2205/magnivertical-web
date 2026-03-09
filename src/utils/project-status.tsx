import {
	CheckCircleIcon,
	CircleIcon,
	CircleOffIcon,
	TimerIcon,
} from "lucide-react";
import type { ProjectStatus } from "@/api/schemas/project-schema";

type Options = ReadonlyArray<{
	key: string;
	value: ProjectStatus;
	icon: React.ReactNode;
}>;

export const projectStatusOptions: Options = [
	{
		key: "Em planejamento",
		value: "PLANNED",
		icon: <CircleIcon className="size-4 text-blue-500" />,
	},
	{
		key: "Em andamento",
		value: "IN_PROGRESS",
		icon: <TimerIcon className="size-4 text-yellow-300" />,
	},
	{
		key: "Concluída",
		value: "COMPLETED",
		icon: <CheckCircleIcon className="size-4 text-green-500" />,
	},
	{
		key: "Cancelada",
		value: "CANCELED",
		icon: <CircleOffIcon className="size-4 text-red-500" />,
	},
];

const projectStatusLabels = new Map(
	projectStatusOptions.map(({ key, value }) => [value, key]),
);
export const getProjectStatus = (status: ProjectStatus) => {
	return projectStatusLabels.get(status) ?? status;
};

const projectStatusIcons = new Map(
	projectStatusOptions.map(({ icon, value }) => [value, icon]),
);

export const getProjectStatusIcon = (status: ProjectStatus) => {
	return projectStatusIcons.get(status) ?? status;
};
