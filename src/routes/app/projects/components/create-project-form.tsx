import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateProject } from "@/api/hooks/projects/use-create-project";
import {
	addressPostalCodeRegex,
	districts,
} from "@/api/schemas/address-schema";
import { ComplementInputField } from "@/components/_form-fields/inputs/complement-input-field";
import { PostalCodeInputField } from "@/components/_form-fields/inputs/postal-code-input-field";
import { StreetInputField } from "@/components/_form-fields/inputs/street-input-field";
import { DistrictSelectField } from "@/components/_form-fields/selects/district-select-field";
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
import { useProjects } from "../contexts/projects-provider";
import { CustomerComboboxField } from "./customer-combobox-field";
import { ReferenceInputField } from "./reference-input-field";

export const createProjectFormSchema = z.object({
	name: z.string().min(1, "É necessário introduzir a referência"),
	customerId: z.string().min(1, "É necessário selecionar um cliente"),
	street: z.string().min(1, "É necessário introduzir a morada"),
	postalCode: z
		.string()
		.min(1, "É necessário introduzir o código postal")
		.regex(
			addressPostalCodeRegex,
			"É necessário introduzir um código postal no formato (xxxx-xxx)",
		),
	complement: z.string().optional(),
	district: z.enum(districts),
});

type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

type CreateProjectFormProps = {
	disableTrigger: boolean;
};

export function CreateProjectForm({ disableTrigger }: CreateProjectFormProps) {
	const defaultValues: CreateProjectFormValues = {
		name: "",
		customerId: "",
		street: "",
		postalCode: "",
		complement: "",
		district: "ACORES",
	};

	const form = useForm({
		resolver: zodResolver(createProjectFormSchema),
		defaultValues,
	});

	const { createProject, isPending } = useCreateProject();

	const { isCreateProjectDialogOpen, setIsCreateProjectDialogOpen } =
		useProjects();

	const handleSubmit = async (values: CreateProjectFormValues) => {
		const { street, postalCode, complement, district, ...data } = values;

		await createProject({
			...data,
			address: {
				street,
				postalCode,
				complement: complement ?? null,
				district,
			},
		});
		setIsCreateProjectDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsCreateProjectDialogOpen(false);

	return (
		<Dialog
			open={isCreateProjectDialogOpen}
			onOpenChange={setIsCreateProjectDialogOpen}>
			<CreateFormTrigger target="obra" disableTrigger={disableTrigger} />
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus} className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Registar obra</DialogTitle>
					<DialogDescription>
						Preencha os dados abaixo para registar uma nova obra.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-96">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-7 px-6">
							<ReferenceInputField form={form} path="name" />
							<CustomerComboboxField form={form} path="customerId" />
							<StreetInputField form={form} path="street" />
							<DistrictSelectField form={form} path="district" />
							<PostalCodeInputField form={form} path="postalCode" />
							<ComplementInputField form={form} path="complement" />
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
