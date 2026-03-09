import type { FieldValues } from "react-hook-form";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { budgetItemTypeOptions } from "@/utils/budget-item-type";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function BudgetItemTypeSelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={budgetItemTypeOptions}
			label="Tipo"
			placeholder="Selecione o tipo"
		/>
	);
}
