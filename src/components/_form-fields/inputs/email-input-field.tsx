import { MailIcon } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import { InputWithIcon } from "@/components/input-with-icon";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { FormFieldProps } from "@/utils/types/form-field-props";

type EmailInputFieldProps<T extends FieldValues> = FormFieldProps<T> & {
	label?: string;
	placeholder?: string;
};

export function EmailInputField<T extends FieldValues>({
	form,
	path,
	label = "E-mail",
	placeholder = "Introduza o e-mail",
}: EmailInputFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<InputWithIcon
							icon={<MailIcon className="size-4" />}
							type="email"
							placeholder={placeholder}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
