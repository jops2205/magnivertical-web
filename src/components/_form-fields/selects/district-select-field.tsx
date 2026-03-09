import type { FieldValues } from "react-hook-form";
import { districtOptions } from "@/utils/districts";
import type { FormFieldProps } from "@/utils/types/form-field-props";
import { SelectField } from "./select-field";

export function DistrictSelectField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<SelectField
			form={form}
			path={path}
			options={districtOptions}
			label="Distrito"
			placeholder="Selecione o distrito"
		/>
	);
}
