import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateAssignment } from "@/api/hooks/tasks/use-create-assignment";
import { ScheduleDatePickerField } from "@/components/_form-fields/date-pickers/schedule-date-picker-field";
import { DescriptionTextareaField } from "@/components/_form-fields/description-textarea-field";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTasks } from "../contexts/tasks-provider";
import { createTaskFormSchema } from "./create-task-form";
import { TaskPrioritySelectField } from "./task-priority-select-field";
import { TitleInputField } from "./title-input-field";
import { UserComboboxField } from "./user-combobox-field";

export const createAssignmentFormSchema = createTaskFormSchema.extend({
	executorId: z.string().min(1, "É necessário selecionar um colaborador"),
});

export type CreateAssignmentFormValues = z.infer<
	typeof createAssignmentFormSchema
>;

type CreateAssignmentFormProps = {
	disableTrigger: boolean;
};

export function CreateAssignmentForm({
	disableTrigger,
}: CreateAssignmentFormProps) {
	const defaultValues: CreateAssignmentFormValues = {
		title: "",
		description: "",
		priority: "HIGH",
		executorId: "",
		scheduledAt: undefined,
	};

	const form = useForm({
		resolver: zodResolver(createAssignmentFormSchema),
		defaultValues,
	});

	const { createAssignment, isPending } = useCreateAssignment();
	const { isDesktop } = useMediaQuery();

	const { isCreateAssignmentDialogOpen, setIsCreateAssignmentDialogOpen } =
		useTasks();

	const handleSubmit = async (values: CreateAssignmentFormValues) => {
		const { executorId, scheduledAt, ...data } = values;

		await createAssignment({
			...data,
			id: executorId,
			scheduledAt: scheduledAt!,
		});

		setIsCreateAssignmentDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsCreateAssignmentDialogOpen(false);

	return (
		<Dialog
			open={isCreateAssignmentDialogOpen}
			onOpenChange={setIsCreateAssignmentDialogOpen}>
			<DialogTrigger asChild>
				<Button disabled={disableTrigger} size={isDesktop ? "default" : "icon"}>
					{isDesktop ? <PlusCircleIcon /> : <PlusIcon />}
					{isDesktop && "Atribuir tarefa"}
				</Button>
			</DialogTrigger>
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus} className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Atribuir tarefa</DialogTitle>
					<DialogDescription>
						Preencha os dados abaixo para atribuir uma tarefa a um colaborador.
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
							<UserComboboxField form={form} path="executorId" />
							<ScheduleDatePickerField form={form} path="scheduledAt" />
							<div className="flex justify-end gap-2">
								<Button
									type="button"
									variant="outline"
									disabled={isPending}
									onClick={handleCancelButtonClick}>
									Cancelar
								</Button>
								<Button disabled={isPending}>
									{!isPending ? (
										"Atribuir"
									) : (
										<>
											<Spinner /> A concluir atribuição
										</>
									)}
								</Button>
							</div>
						</form>
					</Form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
