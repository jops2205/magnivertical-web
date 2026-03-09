import { MailboxIcon } from "lucide-react";
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

export function PostalCodeInputField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Código Postal</FormLabel>
					<FormControl>
						<InputWithIcon
							icon={<MailboxIcon className="size-4" />}
							placeholder="Introduza o código postal"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
