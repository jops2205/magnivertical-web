import { createContext, useContext, useState } from "react";

type ProjectsContextValue = {
	isCreateProjectDialogOpen: boolean;
	setIsCreateProjectDialogOpen: (isOpen: boolean) => void;
	isUpdateProjectDialogOpen: boolean;
	setIsUpdateProjectDialogOpen: (isOpen: boolean) => void;
	isProjectFilterDialogOpen: boolean;
	setIsProjectFilterDialogOpen: (isOpen: boolean) => void;
};

type ProjectsProviderProps = {
	children: React.ReactNode;
};

const ProjectsContext = createContext<ProjectsContextValue>(
	{} as ProjectsContextValue,
);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
	const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] =
		useState(false);

	const [isUpdateProjectDialogOpen, setIsUpdateProjectDialogOpen] =
		useState(false);

	const [isProjectFilterDialogOpen, setIsProjectFilterDialogOpen] =
		useState(false);

	const value: ProjectsContextValue = {
		isCreateProjectDialogOpen,
		setIsCreateProjectDialogOpen,
		isUpdateProjectDialogOpen,
		setIsUpdateProjectDialogOpen,
		isProjectFilterDialogOpen,
		setIsProjectFilterDialogOpen,
	};

	return (
		<ProjectsContext.Provider value={value}>
			{children}
		</ProjectsContext.Provider>
	);
}

export const useProjects = () => {
	return useContext(ProjectsContext);
};
