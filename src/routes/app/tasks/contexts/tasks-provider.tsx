import { createContext, useContext, useState } from "react";

type TaskQueryString = Partial<{
	page: string;
	perPage: string;
	order: string;
	search: string;
	status: string;
	priority: string;
	executor: string;
}>;

type TasksContextValue = {
	isCreateTaskDialogOpen: boolean;
	setIsCreateTaskDialogOpen: (isOpen: boolean) => void;
	isUpdateTaskDialogOpen: boolean;
	setIsUpdateTaskDialogOpen: (isOpen: boolean) => void;
	isCreateAssignmentDialogOpen: boolean;
	setIsCreateAssignmentDialogOpen: (isOpen: boolean) => void;
	isUpdateAssignmentDialogOpen: boolean;
	setIsUpdateAssignmentDialogOpen: (isOpen: boolean) => void;
	isTaskFilterDialogOpen: boolean;
	setIsTaskFilterDialogOpen: (isOpen: boolean) => void;
	taskTabValue: string;
	setTaskTabValue: (value: string) => void;
	taskQueryString: TaskQueryString;
	setTaskQueryString: (queryString: TaskQueryString) => void;
};

type TasksProviderProps = {
	children: React.ReactNode;
};

const TasksContext = createContext<TasksContextValue>({} as TasksContextValue);

export function TasksProvider({ children }: TasksProviderProps) {
	const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
	const [isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen] = useState(false);

	const [isCreateAssignmentDialogOpen, setIsCreateAssignmentDialogOpen] =
		useState(false);

	const [isUpdateAssignmentDialogOpen, setIsUpdateAssignmentDialogOpen] =
		useState(false);

	const [isTaskFilterDialogOpen, setIsTaskFilterDialogOpen] = useState(false);
	const [taskTabValue, setTaskTabValue] = useState("tasks");
	const [taskQueryString, setTaskQueryString] = useState<TaskQueryString>({});

	const value: TasksContextValue = {
		isCreateTaskDialogOpen,
		setIsCreateTaskDialogOpen,
		isUpdateTaskDialogOpen,
		setIsUpdateTaskDialogOpen,
		isCreateAssignmentDialogOpen,
		setIsCreateAssignmentDialogOpen,
		isUpdateAssignmentDialogOpen,
		setIsUpdateAssignmentDialogOpen,
		isTaskFilterDialogOpen,
		setIsTaskFilterDialogOpen,
		taskTabValue,
		setTaskTabValue,
		taskQueryString,
		setTaskQueryString: (queryString: TaskQueryString) => {
			setTaskQueryString((prevState) => {
				const nextState = {
					...prevState,
				};

				for (const key of Object.keys(queryString) as Array<
					keyof TaskQueryString
				>) {
					const value = queryString[key];

					if (value === "" || value === undefined) {
						delete nextState[key];
					} else {
						nextState[key] = value;
					}
				}

				return nextState;
			});
		},
	};

	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
}

export const useTasks = () => {
	return useContext(TasksContext);
};
