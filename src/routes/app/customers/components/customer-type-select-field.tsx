import type { FieldValues } from "react-hook-form";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { customerTypeOptions } from "@/utils/customer-type";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function CustomerTypeSelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={customerTypeOptions}
			label="Tipo"
			placeholder="Selecione o tipo"
		/>
	);
}
