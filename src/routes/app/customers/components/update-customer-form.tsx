import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateCustomer } from "@/api/hooks/customers/use-update-customer";
import type { Customer } from "@/api/schemas/customer-schema";
import { ComplementInputField } from "@/components/_form-fields/inputs/complement-input-field";
import { EmailInputField } from "@/components/_form-fields/inputs/email-input-field";
import { NameInputField } from "@/components/_form-fields/inputs/name-input-field";
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
import { useCustomers } from "../contexts/customers-provider";
import {
	type CreateCustomerFormValues,
	createCustomerFormSchema,
} from "./create-customer-form";
import { CustomerTypeSelectField } from "./customer-type-select-field";
import { PhoneInputField } from "./phone-input-field";
import { TaxpayerInputField } from "./taxpayer-input-field";

export const updateCustomerFormSchema = createCustomerFormSchema;

export type UpdateCustomerFormValues = CreateCustomerFormValues;

type UpdateCustomerFormProps = {
	customer: Customer;
};

export function UpdateCustomerForm({ customer }: UpdateCustomerFormProps) {
	const { address } = customer;

	const defaultValues: UpdateCustomerFormValues = {
		name: customer.name,
		email: customer.email,
		taxpayer: customer.taxpayer,
		phone: customer.phone,
		type: customer.type,
		street: address.street,
		postalCode: address.postalCode,
		complement: address.complement ?? undefined,
		district: address.district,
	};

	const form = useForm({
		resolver: zodResolver(updateCustomerFormSchema),
		defaultValues,
	});

	const { updateCustomer, isPending } = useUpdateCustomer();

	const { isUpdateCustomerDialogOpen, setIsUpdateCustomerDialogOpen } =
		useCustomers();

	const handleSubmit = async (values: UpdateCustomerFormValues) => {
		const { street, postalCode, complement, district, ...data } = values;

		await updateCustomer({
			...data,
			id: customer.id,
			address: {
				street,
				postalCode,
				complement: complement ?? null,
				district,
			},
		});

		setIsUpdateCustomerDialogOpen(false);
	};

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateCustomerDialogOpen(false);

	return (
		<Dialog
			open={isUpdateCustomerDialogOpen}
			onOpenChange={setIsUpdateCustomerDialogOpen}>
			<DialogTrigger asChild>
				<UpdateFormTrigger />
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}
				className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Editar dados do cliente</DialogTitle>
					<DialogDescription>
						Altere as informações do cliente conforme necessário.
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
