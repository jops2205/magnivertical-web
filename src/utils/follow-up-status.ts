import type { FollowUpStatus } from "@/api/schemas/follow-up-schema";

type Options = ReadonlyArray<{
	key: string;
	value: FollowUpStatus;
}>;

export const followUpStatusOptions: Options = [
	{
		key: "Pendente",
		value: "PENDING",
	},
	{
		key: "Concluído",
		value: "COMPLETED",
	},
	{
		key: "Finalizado",
		value: "CLOSED",
	},
];

const followUpStatusLabels = new Map(
	followUpStatusOptions.map(({ key, value }) => [value, key]),
);

export const getFollowUpStatus = (status: FollowUpStatus) => {
	return followUpStatusLabels.get(status) ?? status;
};
