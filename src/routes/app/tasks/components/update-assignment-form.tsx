import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateAssignment } from "@/api/hooks/tasks/use-update-assignment";
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
	type CreateAssignmentFormValues,
	createAssignmentFormSchema,
} from "./create-assignment-form";
import { TaskPrioritySelectField } from "./task-priority-select-field";
import { TitleInputField } from "./title-input-field";
import { UserComboboxField } from "./user-combobox-field";

export const updateAssignmentFormSchema = createAssignmentFormSchema;

export type UpdateAssignmentFormValues = CreateAssignmentFormValues;

type UpdateAssignmentFormProps = {
	assignment: Task;
};

export function UpdateAssignmentForm({
	assignment,
}: UpdateAssignmentFormProps) {
	const defaultValues: UpdateAssignmentFormValues = {
		title: assignment.title,
		description: assignment.description,
		priority: assignment.priority,
		scheduledAt: assignment.scheduledAt,
		executorId: assignment.executorId ?? "",
	};

	const form = useForm({
		resolver: zodResolver(updateAssignmentFormSchema),
		defaultValues,
	});

	const { updateAssignment, isPending } = useUpdateAssignment();

	const { isUpdateAssignmentDialogOpen, setIsUpdateAssignmentDialogOpen } =
		useTasks();

	const handleSubmit = async (values: UpdateAssignmentFormValues) => {
		const { scheduledAt, ...data } = values;

		await updateAssignment({
			...data,
			id: assignment.id,
			scheduledAt: scheduledAt!,
		});

		setIsUpdateAssignmentDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateAssignmentDialogOpen(false);

	return (
		<Dialog
			open={isUpdateAssignmentDialogOpen}
			onOpenChange={setIsUpdateAssignmentDialogOpen}>
			<DialogTrigger asChild>
				<UpdateFormTrigger />
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}
				className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Editar dados da tarefa atribuída</DialogTitle>
					<DialogDescription>
						Altere as informações da tarefa atribuída conforme necessário.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7 px-6">
						<TitleInputField form={form} path="title" />
						<DescriptionTextareaField form={form} path="description" />
						<TaskPrioritySelectField form={form} path="priority" />
						<UserComboboxField form={form} path="executorId" />
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
