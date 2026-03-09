import type { FieldValues } from "react-hook-form";
import { orderingOptions } from "@/utils/ordering";
import type { FormFieldProps } from "@/utils/types/form-field-props";
import { SelectField } from "./select-field";

export function OrderingSelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={orderingOptions}
			label="Ordenação"
			placeholder="Selecione a ordenação"
		/>
	);
}
