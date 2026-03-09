import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { createContext, useContext, useId } from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
	useFormState,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Form = FormProvider;

type FormFieldContextValue<
	T extends FieldValues = FieldValues,
	K extends FieldPath<T> = FieldPath<T>,
> = {
	name: K;
};

const FormFieldContext = createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

export function FormField<
	T extends FieldValues = FieldValues,
	K extends FieldPath<T> = FieldPath<T>,
>({ name, ...props }: ControllerProps<T, K>) {
	return (
		<FormFieldContext.Provider value={{ name }}>
			<Controller {...{ name, ...props }} />
		</FormFieldContext.Provider>
	);
}

type FormItemContextValue = {
	id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

export function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

const useFormField = () => {
	const { name } = useContext(FormFieldContext);
	const { id } = useContext(FormItemContext);

	const { getFieldState } = useFormContext();

	const formState = useFormState({ name });
	const fieldState = getFieldState(name, formState);

	return {
		id,
		name,
		itemId: `${id}-form-item`,
		descriptionId: `${id}-form-item-description`,
		messageId: `${id}-form-item-message`,
		...fieldState,
	};
};

export function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, itemId } = useFormField();

	return (
		<Label
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={itemId}
			data-slot="form-label"
			data-error={!!error}
			{...props}
		/>
	);
}

export function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, itemId, descriptionId, messageId } = useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={itemId}
			aria-invalid={!!error}
			aria-describedby={
				!error ? `${descriptionId}` : `${descriptionId} ${messageId}`
			}
			{...props}
		/>
	);
}

export function FormDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	const { descriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={descriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function FormMessage({
	className,
	...props
}: React.ComponentProps<"p">) {
	const { error, messageId } = useFormField();

	const message = error ? String(error?.message ?? "") : props.children;

	if (!message) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={messageId}
			className={cn("text-destructive text-sm", className)}
			{...props}>
			{message}
		</p>
	);
}
