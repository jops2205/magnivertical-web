import { pt } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { capitalizeFirstLetter } from "@/utils/funcs/capitalize-first-letter";
import { formatDate } from "@/utils/funcs/formatters";
import type { FormFieldProps } from "@/utils/types/form-field-props";

type DatePickerFieldProps<T extends FieldValues> = FormFieldProps<T> & {
	label: string;
	placeholder: string;
	isString?: boolean;
};

export function DatePickerField<T extends FieldValues>({
	form,
	path,
	label,
	placeholder,
	isString = false,
}: DatePickerFieldProps<T>) {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	return (
		<FormField
			name={path}
			control={form.control}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormItem className="flex flex-col">
					<FormLabel>{label}</FormLabel>
					<Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									className={cn(
										"pl-3 text-left font-normal",
										!value &&
											"text-muted-foreground hover:text-muted-foreground",
										!!error && "border-destructive dark:border-destructive",
									)}>
									{value ? formatDate(value) : placeholder}
									<CalendarIcon className="ml-auto size-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-2" align="start" side="top">
							<Calendar
								mode="single"
								locale={pt}
								selected={value}
								formatters={{
									formatCaption: (month) => {
										const name = month.toLocaleString("pt-PT", {
											month: "long",
										});

										const year = month.getFullYear();

										return `${capitalizeFirstLetter(name)} ${year}`;
									},
									formatWeekdayName: (weekday) => {
										const name = new Intl.DateTimeFormat("pt-PT", {
											weekday: "short",
										})
											.format(weekday)
											.slice(0, 3);

										return capitalizeFirstLetter(name);
									},
								}}
								onSelect={(value) => {
									onChange(isString ? value?.toISOString() : value);
									setIsDatePickerOpen(false);
								}}
							/>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
