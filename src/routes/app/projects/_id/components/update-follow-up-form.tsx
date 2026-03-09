import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useUpdateFollowUp } from "@/api/hooks/follow-ups/use-update-follow-up";
import { type FollowUp, followUpStatus } from "@/api/schemas/follow-up-schema";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { UpdateFormActions } from "@/components/update-form-actions";
import { useProject } from "../contexts/project-provider";
import { FollowUpStatusSelectField } from "./follow-up-status-select-field";

const updateFollowUpFormSchema = z.object({
	description: z.string().min(1, "É necessário introduzir a descrição"),
	status: z.enum(followUpStatus),
	nextSchedule: z.date().optional(),
});

type UpdateFollowUpFormValues = z.infer<typeof updateFollowUpFormSchema>;

type UpdateFollowUpFormProps = {
	followUp: FollowUp;
};

export function UpdateFollowUpForm({ followUp }: UpdateFollowUpFormProps) {
	const defaultValues: UpdateFollowUpFormValues = {
		description: "",
		status: "COMPLETED",
		nextSchedule: undefined,
	};

	const form = useForm<UpdateFollowUpFormValues>({
		resolver: zodResolver(updateFollowUpFormSchema),
		defaultValues,
	});

	const status = useWatch({
		control: form.control,
		name: "status",
	});

	const { updateFollowUp, isPending } = useUpdateFollowUp();

	const { isUpdateFollowUpDialogOpen, setIsUpdateFollowUpDialogOpen } =
		useProject();

	const handleSubmit = async (values: UpdateFollowUpFormValues) => {
		await updateFollowUp({ ...values, id: followUp.id });

		setIsUpdateFollowUpDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateFollowUpDialogOpen(false);

	return (
		<Dialog
			open={isUpdateFollowUpDialogOpen}
			onOpenChange={setIsUpdateFollowUpDialogOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(event) => event.preventDefault()}>
					<EditIcon />
					Realizar
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}>
				<DialogHeader>
					<DialogTitle>Realizar follow-Up</DialogTitle>
					<DialogDescription>
						Realize o follow-up preenchendo as informações necessárias.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-7">
						<DescriptionTextareaField form={form} path="description" />
						<FollowUpStatusSelectField form={form} path="status" />
						{status === "COMPLETED" && (
							<ScheduleDatePickerField form={form} path="nextSchedule" />
						)}
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
