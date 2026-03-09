import { useGetUsersWithoutQuery } from "@/api/hooks/users/use-get-users-without-query";

type UseUserIdsReturn = ReadonlyArray<{
	id: string;
	name: string;
}>;

export const useUserIds = () => {
	const { users } = useGetUsersWithoutQuery();

	return users.map((user) => ({
		id: user.id,
		name: user.name,
	})) satisfies UseUserIdsReturn;
};
