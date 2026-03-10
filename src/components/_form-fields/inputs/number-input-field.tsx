import type { FieldValues } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { InputWithIcon } from "@/components/input-with-icon";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { FormFieldProps } from "@/utils/types/form-field-props";

type NumberInputFieldProps<T extends FieldValues> = FormFieldProps<T> & {
	label: string;
	placeholder: string;
	icon: React.ReactNode;
	prefix?: string;
	suffix?: string;
	thousandSeparator?: string;
	decimalSeparator?: string;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
};

export function NumberInputField<T extends FieldValues>({
	form,
	path,
	label,
	...props
}: NumberInputFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<NumericFormat
							customInput={InputWithIcon}
							allowNegative={false}
							value={field.value}
							onValueChange={(values) => {
								field.onChange(values.value);
							}}
							onBlur={field.onBlur}
							{...props}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
