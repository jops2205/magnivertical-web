import type { FieldValues } from "react-hook-form";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { followUpStatusOptions } from "@/utils/follow-up-status";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function FollowUpStatusSelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={followUpStatusOptions}
			label="Status"
			placeholder="Selecione o status"
		/>
	);
}
