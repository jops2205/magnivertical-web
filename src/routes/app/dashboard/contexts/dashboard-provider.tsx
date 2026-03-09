import { createContext, useContext, useState } from "react";

type DashboardContextValue = {
	isMetricFilterDialogOpen: boolean;
	setIsMetricFilterDialogOpen: (isOpen: boolean) => void;
};

type DashboardProviderProps = {
	children: React.ReactNode;
};

const DashboardContext = createContext<DashboardContextValue>(
	{} as DashboardContextValue,
);

export function DashboardProvider({ children }: DashboardProviderProps) {
	const [isMetricFilterDialogOpen, setIsMetricFilterDialogOpen] =
		useState(false);

	const value: DashboardContextValue = {
		isMetricFilterDialogOpen,
		setIsMetricFilterDialogOpen,
	};

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
}

export const useDashboard = () => {
	return useContext(DashboardContext);
};
