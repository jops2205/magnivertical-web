import type { FieldValues } from "react-hook-form";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { taskPriorityOptions } from "@/utils/task-priority";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function TaskPrioritySelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={taskPriorityOptions}
			label="Prioridade"
			placeholder="Selecione a prioridade"
		/>
	);
}
