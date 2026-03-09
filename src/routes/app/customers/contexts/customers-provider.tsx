import { createContext, useContext, useState } from "react";

type CustomersContextValue = {
	isCreateCustomerDialogOpen: boolean;
	setIsCreateCustomerDialogOpen: (isOpen: boolean) => void;
	isUpdateCustomerDialogOpen: boolean;
	setIsUpdateCustomerDialogOpen: (isOpen: boolean) => void;
	isCustomerFilterDialogOpen: boolean;
	setIsCustomerFilterDialogOpen: (isOpen: boolean) => void;
};

type CustomersProviderProps = {
	children: React.ReactNode;
};

const CustomersContext = createContext<CustomersContextValue>(
	{} as CustomersContextValue,
);

export function CustomersProvider({ children }: CustomersProviderProps) {
	const [isCreateCustomerDialogOpen, setIsCreateCustomerDialogOpen] =
		useState(false);

	const [isUpdateCustomerDialogOpen, setIsUpdateCustomerDialogOpen] =
		useState(false);

	const [isCustomerFilterDialogOpen, setIsCustomerFilterDialogOpen] =
		useState(false);

	const value: CustomersContextValue = {
		isCreateCustomerDialogOpen,
		setIsCreateCustomerDialogOpen,
		isUpdateCustomerDialogOpen,
		setIsUpdateCustomerDialogOpen,
		isCustomerFilterDialogOpen,
		setIsCustomerFilterDialogOpen,
	};

	return (
		<CustomersContext.Provider value={value}>
			{children}
		</CustomersContext.Provider>
	);
}

export const useCustomers = () => {
	return useContext(CustomersContext);
};
