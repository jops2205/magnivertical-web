import { PercentIcon } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import { NumberInputField } from "@/components/_form-fields/inputs/number-input-field";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function DiscountInputField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<NumberInputField
			form={form}
			path={path}
			label="Desconto"
			placeholder="Introduza o desconto"
			icon={<PercentIcon className="size-4" />}
		/>
	);
}
