import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FromDatePickerField } from "@/components/_form-fields/date-pickers/from-date-picker-field";
import { ToDatePickerField } from "@/components/_form-fields/date-pickers/to-date-picker-field";
import { FilterSheet } from "@/components/filter-sheet";
import { FilterSheetActions } from "@/components/filter-sheet-actions";
import { Form } from "@/components/ui/form";
import { useQueryString } from "@/hooks/use-query-string";
import { useDashboard } from "../contexts/dashboard-provider";

const metricFilterFormSchema = z
	.object({
		from: z.string(),
		to: z.string(),
	})
	.partial();

type MetricFilterFormValues = z.infer<typeof metricFilterFormSchema>;

export function MetricFilterSheet() {
	const [queryString, setQueryString] = useQueryString();
	const { from, to } = queryString;

	const { isMetricFilterDialogOpen, setIsMetricFilterDialogOpen } =
		useDashboard();

	const form = useForm({
		resolver: zodResolver(metricFilterFormSchema),
		defaultValues: {
			from: from ?? "",
			to: to ?? "",
		},
	});

	const handleSubmit = (values: MetricFilterFormValues) => {
		setQueryString(values);

		setIsMetricFilterDialogOpen(false);
	};

	const handleResetButtonClick = () => {
		setQueryString({ from: null, to: null });

		setIsMetricFilterDialogOpen(false);

		form.reset({ from: "", to: "" });
	};

	const isFiltered = !!from || !!to;

	return (
		<FilterSheet
			open={isMetricFilterDialogOpen}
			onOpenChange={setIsMetricFilterDialogOpen}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex h-full flex-col">
					<div className="flex-1 space-y-6 px-4">
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
