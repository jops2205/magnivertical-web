import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FromDatePickerField } from "@/components/_form-fields/date-pickers/from-date-picker-field";
import { ToDatePickerField } from "@/components/_form-fields/date-pickers/to-date-picker-field";
import { OrderingSelectField } from "@/components/_form-fields/selects/ordering-select-field";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { FilterSheet } from "@/components/filter-sheet";
import { FilterSheetActions } from "@/components/filter-sheet-actions";
import { Form } from "@/components/ui/form";
import { useQueryString } from "@/hooks/use-query-string";
import { projectStatusOptions } from "@/utils/project-status";
import { useProjects } from "../contexts/projects-provider";
import { CustomerComboboxField } from "./customer-combobox-field";

const projectFilterFormSchema = z
	.object({
		order: z.string(),
		from: z.string(),
		to: z.string(),
		status: z.string(),
		customer: z.string(),
	})
	.partial();

type ProjectFilterFormValues = z.infer<typeof projectFilterFormSchema>;

export function ProjectFilterSheet() {
	const [queryString, setQueryString] = useQueryString();
	const { order, from, to, status, customer } = queryString;

	const { isProjectFilterDialogOpen, setIsProjectFilterDialogOpen } =
		useProjects();

	const form = useForm({
		resolver: zodResolver(projectFilterFormSchema),
		defaultValues: {
			order: order ?? "",
			from: from ?? "",
			to: to ?? "",
			status: status ?? "",
			customer: customer ?? "",
		},
	});

	const handleSubmit = (values: ProjectFilterFormValues) => {
		setQueryString({ page: "1", ...values });

		setIsProjectFilterDialogOpen(false);
	};

	const handleResetButtonClick = () => {
		setQueryString({
			page: "1",
			order: null,
			from: null,
			to: null,
			status: null,
			customer: null,
		});

		setIsProjectFilterDialogOpen(false);

		form.reset({ order: "", from: "", to: "", status: "", customer: "" });
	};

	const isFiltered = !!order || !!from || !!to || !!status || !!customer;

	return (
		<FilterSheet
			open={isProjectFilterDialogOpen}
			onOpenChange={setIsProjectFilterDialogOpen}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex h-full flex-col">
					<div className="flex-1 space-y-7 px-4">
						<OrderingSelectField form={form} path="order" />
						<SelectField
							form={form}
							path="status"
							options={projectStatusOptions.map(({ key, value }) => {
								return { key, value: value.toLowerCase() };
							})}
							label="Status"
							placeholder="Selecione o status"
						/>
						<CustomerComboboxField form={form} path="customer" />
						<FromDatePickerField form={form} path="from" />
						<ToDatePickerField form={form} path="to" />
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
