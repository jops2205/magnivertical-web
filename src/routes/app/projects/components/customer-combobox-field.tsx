import type { FieldValues } from "react-hook-form";
import { ComboboxField } from "@/components/_form-fields/combobox-field";
import { useCustomerIds } from "@/hooks/use-customer-ids";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function CustomerComboboxField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	const customerIds = useCustomerIds();

	const options = customerIds.map(({ id, name }) => ({ key: name, value: id }));

	return (
		<ComboboxField
			form={form}
			path={path}
			options={options}
			label="Cliente"
			placeholder="Procurar por cliente..."
			text="Selecione o cliente"
		/>
	);
}
