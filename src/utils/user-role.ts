import type { UserRole } from "@/api/schemas/user-schema";

type Options = ReadonlyArray<{
	key: string;
	value: UserRole;
}>;

export const userRoleOptions: Options = [
	{
		key: "Assistente",
		value: "ASSISTANT",
	},
	{
		key: "Gerente",
		value: "MANAGER",
	},
];

const userRoleLabels = new Map(
	userRoleOptions.map(({ key, value }) => [value, key]),
);

export const getUserRole = (role: UserRole) => {
	return userRoleLabels.get(role) ?? role;
};
