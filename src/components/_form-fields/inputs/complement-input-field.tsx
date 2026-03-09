import { MapPinPlusIcon } from "lucide-react";
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

export function ComplementInputField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Complemente</FormLabel>
					<FormControl>
						<InputWithIcon
							icon={<MapPinPlusIcon className="size-4" />}
							placeholder="Introduza o complemento"
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
