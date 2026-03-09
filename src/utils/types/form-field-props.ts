import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	path: Path<T>;
};
