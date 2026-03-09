import { createContext, useContext, useState } from "react";

type UsersContextValue = {
	isCreateUserDialogOpen: boolean;
	setIsCreateUserDialogOpen: (isOpen: boolean) => void;
	isUpdateUserDialogOpen: boolean;
	setIsUpdateUserDialogOpen: (isOpen: boolean) => void;
	isUserFilterDialogOpen: boolean;
	setIsUserFilterDialogOpen: (isOpen: boolean) => void;
};

type UsersProviderProps = {
	children: React.ReactNode;
};

const UsersContext = createContext<UsersContextValue>({} as UsersContextValue);

export function UsersProvider({ children }: UsersProviderProps) {
	const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
	const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
	const [isUserFilterDialogOpen, setIsUserFilterDialogOpen] = useState(false);

	const value: UsersContextValue = {
		isCreateUserDialogOpen,
		setIsCreateUserDialogOpen,
		isUpdateUserDialogOpen,
		setIsUpdateUserDialogOpen,
		isUserFilterDialogOpen,
		setIsUserFilterDialogOpen,
	};

	return (
		<UsersContext.Provider value={value}>{children}</UsersContext.Provider>
	);
}

export const useUsers = () => {
	return useContext(UsersContext);
};
