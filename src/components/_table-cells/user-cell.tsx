import { useUserIds } from "@/hooks/use-user-ids";

type UserCellProps = {
	id: string;
};

export function UserCell({ id }: UserCellProps) {
	const userIds = useUserIds();

	const users = Object.fromEntries(userIds.map(({ id, name }) => [id, name]));

	return <>{users[id]}</>;
}
