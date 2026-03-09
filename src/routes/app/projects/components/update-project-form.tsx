import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useUpdateProject } from "@/api/hooks/projects/use-update-project";
import type { Project } from "@/api/schemas/project-schema";
import { ComplementInputField } from "@/components/_form-fields/inputs/complement-input-field";
import { PostalCodeInputField } from "@/components/_form-fields/inputs/postal-code-input-field";
import { StreetInputField } from "@/components/_form-fields/inputs/street-input-field";
import { DistrictSelectField } from "@/components/_form-fields/selects/district-select-field";
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
import { UpdateFormActions } from "@/components/update-form-actions";
import { UpdateFormTrigger } from "@/components/update-form-trigger";
import { useProjects } from "../contexts/projects-provider";
import { createProjectFormSchema } from "./create-project-form";
import { ReferenceInputField } from "./reference-input-field";

export const updateProjectFormSchema = createProjectFormSchema.omit({
	customerId: true,
});

export type UpdateProjectFormValues = z.infer<typeof updateProjectFormSchema>;

type UpdateProjectFormProps = {
	project: Project;
};

export function UpdateProjectForm({ project }: UpdateProjectFormProps) {
	const { address } = project;

	const defaultValues: UpdateProjectFormValues = {
		name: project.name,
		street: address.street,
		postalCode: address.postalCode,
		complement: address.complement ?? undefined,
		district: address.district,
	};

	const form = useForm({
		resolver: zodResolver(updateProjectFormSchema),
		defaultValues,
	});

	const { updateProject, isPending } = useUpdateProject();

	const { isUpdateProjectDialogOpen, setIsUpdateProjectDialogOpen } =
		useProjects();

	const handleSubmit = async (values: UpdateProjectFormValues) => {
		const { street, postalCode, complement, district, ...data } = values;

		await updateProject({
			...data,
			id: project.id,
			address: {
				street,
				postalCode,
				complement: complement ?? null,
				district,
			},
		});

		setIsUpdateProjectDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateProjectDialogOpen(false);

	return (
		<Dialog
			open={isUpdateProjectDialogOpen}
			onOpenChange={setIsUpdateProjectDialogOpen}>
			<DialogTrigger asChild>
				<UpdateFormTrigger />
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}
				className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Editar dados da obra</DialogTitle>
					<DialogDescription>
						Altere as informações da obra conforme necessário.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-96">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-7 px-6">
							<ReferenceInputField form={form} path="name" />
							<StreetInputField form={form} path="street" />
							<DistrictSelectField form={form} path="district" />
							<PostalCodeInputField form={form} path="postalCode" />
							<ComplementInputField form={form} path="complement" />
							<UpdateFormActions
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
