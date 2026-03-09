import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateTask } from "@/api/hooks/tasks/use-create-task";
import { taskPriority } from "@/api/schemas/task-schema";
import { ScheduleDatePickerField } from "@/components/_form-fields/date-pickers/schedule-date-picker-field";
import { DescriptionTextareaField } from "@/components/_form-fields/description-textarea-field";
import { CreateFormActions } from "@/components/create-form-actions";
import { CreateFormTrigger } from "@/components/create-form-trigger";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTasks } from "../contexts/tasks-provider";
import { TaskPrioritySelectField } from "./task-priority-select-field";
import { TitleInputField } from "./title-input-field";

export const createTaskFormSchema = z.object({
	title: z.string().min(1, "É necessário introduzir o título"),
	description: z.string().min(1, "É necessário introduzir a descrição"),
	priority: z.enum(taskPriority),
	scheduledAt: z
		.date()
		.optional()
		.refine((value) => value instanceof Date, {
			message: "É necessário selecionar uma data de agendamento",
		}),
});

export type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

type CreateTaskFormProps = {
	disableTrigger: boolean;
};

export function CreateTaskForm({ disableTrigger }: CreateTaskFormProps) {
	const defaultValues: CreateTaskFormValues = {
		title: "",
		description: "",
		priority: "HIGH",
		scheduledAt: undefined,
	};

	const form = useForm({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues,
	});

	const { createTask, isPending } = useCreateTask();
	const { isCreateTaskDialogOpen, setIsCreateTaskDialogOpen } = useTasks();

	const handleSubmit = async (values: CreateTaskFormValues) => {
		const { scheduledAt, ...data } = values;

		await createTask({
			...data,
			scheduledAt: scheduledAt!,
		});

		setIsCreateTaskDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsCreateTaskDialogOpen(false);

	return (
		<Dialog
			open={isCreateTaskDialogOpen}
			onOpenChange={setIsCreateTaskDialogOpen}>
			<CreateFormTrigger target="tarefa" disableTrigger={disableTrigger} />
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus} className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Registar tarefa</DialogTitle>
					<DialogDescription>
						Preencha os dados abaixo para registar uma nova tarefa.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-96">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-7 px-6">
							<TitleInputField form={form} path="title" />
							<DescriptionTextareaField form={form} path="description" />
							<TaskPrioritySelectField form={form} path="priority" />
							<ScheduleDatePickerField form={form} path="scheduledAt" />
							<CreateFormActions
								disableActions={isPending}
								onCancelButtonClick={handleCancelButtonClick}
							/>
						</form>
					</Form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
