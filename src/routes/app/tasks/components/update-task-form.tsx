import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateTask } from "@/api/hooks/tasks/use-update-task";
import type { Task } from "@/api/schemas/task-schema";
import { ScheduleDatePickerField } from "@/components/_form-fields/date-pickers/schedule-date-picker-field";
import { DescriptionTextareaField } from "@/components/_form-fields/description-textarea-field";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { UpdateFormActions } from "@/components/update-form-actions";
import { UpdateFormTrigger } from "@/components/update-form-trigger";
import { useTasks } from "../contexts/tasks-provider";
import {
	type CreateTaskFormValues,
	createTaskFormSchema,
} from "./create-task-form";
import { TaskPrioritySelectField } from "./task-priority-select-field";
import { TitleInputField } from "./title-input-field";

export const updateTaskFormSchema = createTaskFormSchema;

export type UpdateTaskFormValues = CreateTaskFormValues;

type UpdateTaskFormProps = {
	task: Task;
};

export function UpdateTaskForm({ task }: UpdateTaskFormProps) {
	const defaultValues: UpdateTaskFormValues = {
		title: task.title,
		description: task.description,
		priority: task.priority,
		scheduledAt: task.scheduledAt,
	};

	const form = useForm({
		resolver: zodResolver(updateTaskFormSchema),
		defaultValues,
	});

	const { updateTask, isPending } = useUpdateTask();
	const { isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen } = useTasks();

	const handleSubmit = async (values: UpdateTaskFormValues) => {
		const { scheduledAt, ...data } = values;

		await updateTask({
			...data,
			id: task.id,
			scheduledAt: scheduledAt!,
		});

		setIsUpdateTaskDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateTaskDialogOpen(false);

	return (
		<Dialog
			open={isUpdateTaskDialogOpen}
			onOpenChange={setIsUpdateTaskDialogOpen}>
			<DialogTrigger asChild>
				<UpdateFormTrigger />
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}
				className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Editar dados da tarefa</DialogTitle>
					<DialogDescription>
						Altere as informações da tarefa conforme necessário.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7 px-6">
						<TitleInputField form={form} path="title" />
						<DescriptionTextareaField form={form} path="description" />
						<TaskPrioritySelectField form={form} path="priority" />
						<ScheduleDatePickerField form={form} path="scheduledAt" />
						<UpdateFormActions
							disableActions={isPending}
							onCancelButtonClick={handleCancelButtonClick}
						/>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
