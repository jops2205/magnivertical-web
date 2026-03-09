import type { FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function DescriptionTextareaField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Descrição</FormLabel>
					<FormControl>
						<Textarea
							className="min-h-20 resize-none"
							placeholder="Introduza a descrição"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
