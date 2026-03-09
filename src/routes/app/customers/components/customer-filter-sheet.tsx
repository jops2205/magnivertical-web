import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderingSelectField } from "@/components/_form-fields/selects/ordering-select-field";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { FilterSheet } from "@/components/filter-sheet";
import { FilterSheetActions } from "@/components/filter-sheet-actions";
import { Form } from "@/components/ui/form";
import { useQueryString } from "@/hooks/use-query-string";
import { customerTypeOptions } from "@/utils/customer-type";
import { useCustomers } from "../contexts/customers-provider";

const customerFilterFormSchema = z
	.object({
		order: z.string(),
		type: z.string(),
	})
	.partial();

type CustomerFilterFormValues = z.infer<typeof customerFilterFormSchema>;

export function CustomerFilterSheet() {
	const [queryString, setQueryString] = useQueryString();
	const { order, type } = queryString;

	const { isCustomerFilterDialogOpen, setIsCustomerFilterDialogOpen } =
		useCustomers();

	const form = useForm({
		resolver: zodResolver(customerFilterFormSchema),
		defaultValues: {
			order: order ?? "",
			type: type ?? "",
		},
	});

	const handleSubmit = (values: CustomerFilterFormValues) => {
		setQueryString({ page: "1", ...values });

		setIsCustomerFilterDialogOpen(false);
	};

	const handleResetButtonClick = () => {
		setQueryString({
			page: "1",
			order: null,
			type: null,
		});

		setIsCustomerFilterDialogOpen(false);

		form.reset({ order: "", type: "" });
	};

	const isFiltered = !!order || !!type;

	return (
		<FilterSheet
			open={isCustomerFilterDialogOpen}
			onOpenChange={setIsCustomerFilterDialogOpen}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex h-full flex-col">
					<div className="flex-1 space-y-7 px-4">
						<OrderingSelectField form={form} path="order" />
						<SelectField
							form={form}
							path="type"
							options={customerTypeOptions.map(({ key, value }) => {
								return { key, value: value.toLowerCase() };
							})}
							label="Tipo"
							placeholder="Selecione o tipo"
						/>
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
