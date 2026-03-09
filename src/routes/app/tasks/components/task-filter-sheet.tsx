import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderingSelectField } from "@/components/_form-fields/selects/ordering-select-field";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { FilterSheet } from "@/components/filter-sheet";
import { FilterSheetActions } from "@/components/filter-sheet-actions";
import { Form } from "@/components/ui/form";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { taskStatusOptions } from "@/utils/task-status";
import { useTasks } from "../contexts/tasks-provider";
import { TaskPrioritySelectField } from "./task-priority-select-field";
import { UserComboboxField } from "./user-combobox-field";

const taskFilterFormSchema = z
	.object({
		order: z.string(),
		status: z.string(),
		priority: z.string(),
		executor: z.string(),
	})
	.partial();

type TaskFilterFormValues = z.infer<typeof taskFilterFormSchema>;

export function TaskFilterSheet() {
	const { user } = useCurrentUser();

	const {
		isTaskFilterDialogOpen,
		setIsTaskFilterDialogOpen,
		taskTabValue,
		taskQueryString,
		setTaskQueryString,
	} = useTasks();

	const { order, status, priority, executor } = taskQueryString;

	const form = useForm({
		resolver: zodResolver(taskFilterFormSchema),
		defaultValues: {
			order: order ?? "",
			status: status ?? "",
			priority: priority ?? "",
			executor: executor ?? "",
		},
	});

	const handleSubmit = (values: TaskFilterFormValues) => {
		setTaskQueryString({ page: "1", ...values });

		setIsTaskFilterDialogOpen(false);
	};

	const handleResetButtonClick = () => {
		setTaskQueryString({
			page: "1",
			order: "",
			status: "",
			priority: "",
			executor: "",
		});

		setIsTaskFilterDialogOpen(false);

		form.reset({ order: "", status: "", priority: "", executor: "" });
	};

	const isFiltered = !!order || !!status || !!priority || !!executor;

	// biome-ignore-start lint/correctness/useExhaustiveDependencies: ""
	useEffect(() => {
		setTaskQueryString({
			page: "1",
			order: "",
			status: "",
			priority: "",
			executor: "",
		});

		form.reset({ order: "", status: "", priority: "", executor: "" });
	}, [taskTabValue]);
	// biome-ignore-end lint/correctness/useExhaustiveDependencies: ""

	return (
		<FilterSheet
			open={isTaskFilterDialogOpen}
			onOpenChange={setIsTaskFilterDialogOpen}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex h-full flex-col">
					<div className="flex-1 space-y-7 px-4">
						<OrderingSelectField form={form} path="order" />
						<SelectField
							form={form}
							path="status"
							options={taskStatusOptions}
							label="Status"
							placeholder="Selecione o status"
						/>
						<TaskPrioritySelectField form={form} path="priority" />
						{user?.role === "MANAGER" && taskTabValue === "assignments" && (
							<UserComboboxField form={form} path="executor" />
						)}
					</div>
					<FilterSheetActions
						disableActions={!isFiltered}
						onResetButtonClick={handleResetButtonClick}
					/>
				</form>
			</Form>
		</FilterSheet>
	);
}
