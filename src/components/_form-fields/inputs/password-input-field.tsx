import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormFieldProps } from "@/utils/types/form-field-props";

type PasswordInputFieldProps<T extends FieldValues> = FormFieldProps<T> & {
	label?: string;
	placeholder?: string;
};

export function PasswordInputField<T extends FieldValues>({
	form,
	path,
	label = "Palavra-passe",
	placeholder = "Introduza a palavra-passe",
}: PasswordInputFieldProps<T>) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<div className="relative">
						<FormControl>
							<Input
								className="pe-9"
								type={isVisible ? "text" : "password"}
								placeholder={placeholder}
								{...field}
							/>
						</FormControl>
						<button
							type="button"
							onClick={toggleVisibility}
							className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
							{isVisible ? (
								<EyeOffIcon className="size-4" />
							) : (
								<EyeIcon className="size-4" />
							)}
						</button>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
