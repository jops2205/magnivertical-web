import type { FieldValues } from "react-hook-form";
import { DatePickerField } from "@/components/_form-fields/date-pickers/date-picker-field";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function ScheduleDatePickerField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<DatePickerField
			form={form}
			path={path}
			label="Data de agendamento"
			placeholder="Selecione a data de agendamento"
		/>
	);
}
