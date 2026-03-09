import { createContext, useContext, useState } from "react";

type IncompleteBudgetsContextValue = {
	isBudgetFilterDialogOpen: boolean;
	setIsBudgetFilterDialogOpen: (isOpen: boolean) => void;
};

type IncompleteBudgetsProviderProps = {
	children: React.ReactNode;
};

const IncompleteBudgetsContext = createContext<IncompleteBudgetsContextValue>(
	{} as IncompleteBudgetsContextValue,
);

export function IncompleteBudgetsProvider({
	children,
}: IncompleteBudgetsProviderProps) {
	const [isBudgetFilterDialogOpen, setIsBudgetFilterDialogOpen] =
		useState(false);

	const value: IncompleteBudgetsContextValue = {
		isBudgetFilterDialogOpen,
		setIsBudgetFilterDialogOpen,
	};

	return (
		<IncompleteBudgetsContext.Provider value={value}>
			{children}
		</IncompleteBudgetsContext.Provider>
	);
}

export const useIncompleteBudgets = () => {
	return useContext(IncompleteBudgetsContext);
};
