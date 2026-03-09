import { EuroIcon } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import { NumberInputField } from "@/components/_form-fields/inputs/number-input-field";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function PriceInputField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<NumberInputField
			form={form}
			path={path}
			label="Preço"
			placeholder="Introduza o preço"
			thousandSeparator="."
			decimalSeparator=","
			decimalScale={2}
			fixedDecimalScale
			icon={<EuroIcon className="size-4" />}
		/>
	);
}
