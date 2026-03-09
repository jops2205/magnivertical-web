import { CheckIcon, XIcon } from "lucide-react";

type UserStatus = "true" | "false";

type Options = ReadonlyArray<{
	key: string;
	value: UserStatus;
	icon: React.ReactNode;
}>;

export const userStatusOptions: Options = [
	{
		key: "Verificado",
		value: "true",
		icon: <CheckIcon className="size-4 text-green-500" />,
	},
	{
		key: "Não verificado",
		value: "false",
		icon: <XIcon className="size-4 text-red-500" />,
	},
];

const userStatusLabels = new Map(
	userStatusOptions.map(({ key, value }) => [value, key]),
);

export const getUserStatus = (status: UserStatus) => {
	return userStatusLabels.get(status) ?? status;
};

const userStatusIcons = new Map(
	userStatusOptions.map(({ icon, value }) => [value, icon]),
);

export const getUserStatusIcon = (status: UserStatus) => {
	return userStatusIcons.get(status) ?? status;
};
