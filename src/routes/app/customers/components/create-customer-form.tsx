import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateCustomer } from "@/api/hooks/customers/use-create-customer";
import {
	addressPostalCodeRegex,
	districts,
} from "@/api/schemas/address-schema";
import {
	customerPhoneRegex,
	customerTaxpayerRegex,
	customerType,
} from "@/api/schemas/customer-schema";
import { ComplementInputField } from "@/components/_form-fields/inputs/complement-input-field";
import { EmailInputField } from "@/components/_form-fields/inputs/email-input-field";
import { NameInputField } from "@/components/_form-fields/inputs/name-input-field";
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
import { useCustomers } from "../contexts/customers-provider";
import { CustomerTypeSelectField } from "./customer-type-select-field";
import { PhoneInputField } from "./phone-input-field";
import { TaxpayerInputField } from "./taxpayer-input-field";

export const createCustomerFormSchema = z.object({
	name: z.string().min(1, "É necessário introduzir o nome"),
	email: z.email("É necessário introduzir um e-mail válido"),
	taxpayer: z
		.string()
		.min(1, "É necessário introduzir o contribuinte")
		.regex(
			customerTaxpayerRegex,
			"É necessário introduzir um contribuinte no formato (000 000 000)",
		),
	phone: z
		.string()
		.min(1, "É necessário introduzir o telefone")
		.regex(
			customerPhoneRegex,
			"É necessário introduzir um telefone no formato (000 000 000)",
		),
	type: z.enum(customerType),
	street: z.string().min(1, "É necessário introduzir a morada"),
	postalCode: z
		.string()
		.min(1, "É necessário introduzir o código postal")
		.regex(
			addressPostalCodeRegex,
			"É necessário introduzir um código postal no formato (0000-000)",
		),
	complement: z.string().optional(),
	district: z.enum(districts),
});

export type CreateCustomerFormValues = z.infer<typeof createCustomerFormSchema>;

type CreateCustomerFormProps = {
	disableTrigger: boolean;
};

export function CreateCustomerForm({
	disableTrigger,
}: CreateCustomerFormProps) {
	const defaultValues: CreateCustomerFormValues = {
		name: "",
		email: "",
		taxpayer: "",
		phone: "",
		type: "BUSINESS",
		street: "",
		postalCode: "",
		complement: "",
		district: "ACORES",
	};

	const form = useForm({
		resolver: zodResolver(createCustomerFormSchema),
		defaultValues,
	});

	const { createCustomer, isPending } = useCreateCustomer();

	const { isCreateCustomerDialogOpen, setIsCreateCustomerDialogOpen } =
		useCustomers();

	const handleSubmit = async (values: CreateCustomerFormValues) => {
		const { street, postalCode, complement, district, ...data } = values;

		await createCustomer({
			...data,
			address: {
				street,
				postalCode,
				complement: complement ?? null,
				district,
			},
		});

		setIsCreateCustomerDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsCreateCustomerDialogOpen(false);

	return (
		<Dialog
			open={isCreateCustomerDialogOpen}
			onOpenChange={setIsCreateCustomerDialogOpen}>
			<CreateFormTrigger target="cliente" disableTrigger={disableTrigger} />
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus} className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Registar cliente</DialogTitle>
					<DialogDescription>
						Preencha os dados abaixo para registar um novo cliente.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-96">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-7 px-6">
							<NameInputField form={form} path="name" />
							<EmailInputField form={form} path="email" />
							<TaxpayerInputField form={form} path="taxpayer" />
							<PhoneInputField form={form} path="phone" />
							<CustomerTypeSelectField form={form} path="type" />
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
