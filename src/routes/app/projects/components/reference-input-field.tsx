import { TagIcon } from "lucide-react";
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

export function ReferenceInputField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Referência</FormLabel>
					<FormControl>
						<InputWithIcon
							icon={<TagIcon className="size-4" />}
							placeholder="Introduza a referência"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
