import type { FieldValues } from "react-hook-form";
import { ComboboxField } from "@/components/_form-fields/combobox-field";
import { useUserIds } from "@/hooks/use-user-ids";
import type { FormFieldProps } from "@/utils/types/form-field-props";

export function UserComboboxField<T extends FieldValues>({
	form,
	path,
}: FormFieldProps<T>) {
	const userIds = useUserIds();

	const options = userIds.map(({ id, name }) => ({ key: name, value: id }));

	return (
		<ComboboxField
			form={form}
			path={path}
			options={options}
			label="Colaborador"
			placeholder="Procurar por colaborador..."
			text="Selecione o colaborador"
		/>
	);
}
