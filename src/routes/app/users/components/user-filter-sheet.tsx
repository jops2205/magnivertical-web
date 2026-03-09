import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderingSelectField } from "@/components/_form-fields/selects/ordering-select-field";
import { SelectField } from "@/components/_form-fields/selects/select-field";
import { FilterSheet } from "@/components/filter-sheet";
import { FilterSheetActions } from "@/components/filter-sheet-actions";
import { Form } from "@/components/ui/form";
import { useQueryString } from "@/hooks/use-query-string";
import { userRoleOptions } from "@/utils/user-role";
import { userStatusOptions } from "@/utils/user-status";
import { useUsers } from "../contexts/users-provider";

const userFilterFormSchema = z
	.object({
		order: z.string(),
		role: z.string(),
		verified: z.string(),
	})
	.partial();

type UserFilterFormValues = z.infer<typeof userFilterFormSchema>;

export function UserFilterSheet() {
	const [queryString, setQueryString] = useQueryString();
	const { order, role, verified } = queryString;

	const { isUserFilterDialogOpen, setIsUserFilterDialogOpen } = useUsers();

	const form = useForm({
		resolver: zodResolver(userFilterFormSchema),
		defaultValues: {
			order: order ?? "",
			role: role ?? "",
			verified: verified ?? "",
		},
	});

	const handleSubmit = (values: UserFilterFormValues) => {
		setQueryString({ page: "1", ...values });

		setIsUserFilterDialogOpen(false);
	};

	const handleResetButtonClick = () => {
		setQueryString({
			page: "1",
			order: null,
			role: null,
			verified: null,
		});

		setIsUserFilterDialogOpen(false);

		form.reset({ order: "", role: "", verified: "" });
	};

	const isFiltered = !!order || !!role || !!verified;

	return (
		<FilterSheet
			open={isUserFilterDialogOpen}
			onOpenChange={setIsUserFilterDialogOpen}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="flex h-full flex-col">
					<div className="flex-1 space-y-7 px-4">
						<OrderingSelectField form={form} path="order" />
						<SelectField
							form={form}
							path="role"
							options={userRoleOptions.map(({ key, value }) => {
								return { key, value: value.toLowerCase() };
							})}
							label="Função"
							placeholder="Selecione a função"
						/>
						<SelectField
							form={form}
							path="verified"
							options={userStatusOptions}
							label="Status"
							placeholder="Selecione o status"
						/>
					</div>
					<FilterSheetActions
						disableActions={!isFiltered}
						onResetButtonClick={handleResetButtonClick}
					/>
				</form>
			</Form>
		</FilterSheet>
	);
}
