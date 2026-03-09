import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/utils/types/form-field-props";

type Option = {
	key: string;
	value: string;
};

type ComboboxFieldProps<T extends FieldValues> = FormFieldProps<T> & {
	options: ReadonlyArray<Option>;
	label: string;
	placeholder: string;
	text: string;
};

export function ComboboxField<T extends FieldValues>({
	form,
	path,
	options,
	label,
	placeholder,
	text,
}: ComboboxFieldProps<T>) {
	const [isComboboxOpen, setIsComboboxOpen] = useState(false);

	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									className={cn(
										"justify-between",
										value && "hover:text-accent-foreground",
										!value &&
											"text-muted-foreground hover:text-muted-foreground",
										!!error && "border-destructive dark:border-destructive",
									)}>
									{value
										? options.find((option) => option.value === value)?.key
										: text}
									<ChevronsUpDownIcon className="opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-(--radix-popover-trigger-width) p-0">
							<Command>
								<CommandInput placeholder={placeholder} className="h-9" />
								<CommandList>
									<CommandEmpty>Sem resultados</CommandEmpty>
									<CommandGroup>
										{options.map((option) => (
											<CommandItem
												key={option.value}
												value={option.key}
												onSelect={() => {
													onChange(option.value);
													setIsComboboxOpen(false);
												}}>
												{option.key}
												<CheckIcon
													className={cn(
														"ml-auto",
														option.value === value
															? "opacity-100"
															: "opacity-0",
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
