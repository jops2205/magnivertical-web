import { createContext, useContext } from "react";
import { useGetUser } from "@/api/hooks/users/use-get-user";
import type { User } from "@/api/schemas/user-schema";

type CurrentUserContextValue = {
	user?: User;
	isFetching: boolean;
};

type CurrentUserProviderProps = {
	children: React.ReactNode;
};

const CurrentUserContext = createContext<CurrentUserContextValue>(
	{} as CurrentUserContextValue,
);

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
	const { user, isFetching } = useGetUser();

	const value: CurrentUserContextValue = {
		user,
		isFetching,
	};

	return (
		<CurrentUserContext.Provider value={value}>
			{children}
		</CurrentUserContext.Provider>
	);
}

export const useCurrentUser = () => {
	return useContext(CurrentUserContext);
};
