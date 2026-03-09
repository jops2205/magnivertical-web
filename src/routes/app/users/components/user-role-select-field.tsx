import type { FieldValues } from "react-hook-form";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import type { FormFieldProps } from "@/utils/types/form-field-props";
import { userRoleOptions } from "@/utils/user-role";

export function UserRoleSelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={userRoleOptions}
			label="Função"
			placeholder="Selecione a função"
		/>
	);
}
