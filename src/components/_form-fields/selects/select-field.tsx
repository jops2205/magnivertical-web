import type { FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FormFieldProps } from "@/utils/types/form-field-props";

type Option = {
	key: string;
	value: string;
};

type SelectFieldProps<T extends FieldValues> = FormFieldProps<T> & {
	options: ReadonlyArray<Option>;
	label: string;
	placeholder: string;
};

export function SelectField<T extends FieldValues>({
	form,
	path,
	options,
	label,
	placeholder,
}: SelectFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field: { value, onChange } }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select value={value} onValueChange={onChange}>
						<FormControl>
							<SelectTrigger className="w-full">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map(({ key, value }) => (
								<SelectItem key={key} value={value}>
									{key}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
