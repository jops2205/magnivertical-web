import { BoxIcon } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import { NumberInputField } from "@/components/_form-fields/inputs/number-input-field";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function QuantityInputField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<NumberInputField
			form={form}
			path={path}
			label="Quantidade"
			placeholder="Introduza a quantidade"
			icon={<BoxIcon className="size-4" />}
		/>
	);
}
