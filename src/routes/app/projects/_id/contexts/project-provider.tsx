import { createContext, useContext, useState } from "react";

type ProjectContextValue = {
	isCreateBudgetDialogOpen: boolean;
	setIsCreateBudgetDialogOpen: (isOpen: boolean) => void;
	isUpdateBudgetDialogOpen: boolean;
	setIsUpdateBudgetDialogOpen: (isOpen: boolean) => void;
	isUpdateFollowUpDialogOpen: boolean;
	setIsUpdateFollowUpDialogOpen: (isOpen: boolean) => void;
};

type ProjectDetailsProviderControlProps = {
	children: React.ReactNode;
};

const ProjectContext = createContext<ProjectContextValue>(
	{} as ProjectContextValue,
);

export function ProjectProvider({
	children,
}: ProjectDetailsProviderControlProps) {
	const [isCreateBudgetDialogOpen, setIsCreateBudgetDialogOpen] =
		useState(false);

	const [isUpdateBudgetDialogOpen, setIsUpdateBudgetDialogOpen] =
		useState(false);

	const [isUpdateFollowUpDialogOpen, setIsUpdateFollowUpDialogOpen] =
		useState(false);

	const value: ProjectContextValue = {
		isCreateBudgetDialogOpen,
		setIsCreateBudgetDialogOpen,
		isUpdateBudgetDialogOpen,
		setIsUpdateBudgetDialogOpen,
		isUpdateFollowUpDialogOpen,
		setIsUpdateFollowUpDialogOpen,
	};

	return (
		<ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
	);
}

export const useProject = () => {
	return useContext(ProjectContext);
};
