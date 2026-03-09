import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateBudget } from "@/api/hooks/budgets/use-update-budget";
import type { Budget } from "@/api/schemas/budget-schema";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpdateFormActions } from "@/components/update-form-actions";
import { UpdateFormTrigger } from "@/components/update-form-trigger";
import { useProject } from "../contexts/project-provider";
import { AttachmentsUrlInputField } from "./attachments-url-input-field";
import { BudgetItemListFooter } from "./budget-item-list-footer";
import { BudgetItemListHeader } from "./budget-item-list-header";
import { BudgetItemTypeSelectField } from "./budget-item-type-select-field";
import {
	createBudgetFormSchema,
	createBudgetItemFormSchema,
} from "./create-budget-form";
import { DescriptionInputField } from "./description-input-field";
import { DiscountInputField } from "./discount-input-field";

export const updateBudgetFormSchema = createBudgetFormSchema.extend({
	items: z.array(
		createBudgetItemFormSchema.extend({
			id: z.string().optional(),
		}),
	),
});

export type UpdateBudgetFormValues = z.infer<typeof updateBudgetFormSchema>;

type UpdateBudgetFormProps = {
	budget: Budget;
};

export function UpdateBudgetForm({ budget }: UpdateBudgetFormProps) {
	const defaultValues: UpdateBudgetFormValues = {
		name: budget.name,
		percentageDiscount: budget.percentageDiscount.toString(),
		attachmentsUrl: budget.attachmentsUrl,
		items: budget.items.map((item) => ({
			...item,
			price: item.price.toString(),
			quantity: item.quantity.toString(),
		})),
	};

	const form = useForm({
		resolver: zodResolver(updateBudgetFormSchema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	const { updateBudget, isPending } = useUpdateBudget();

	const { isUpdateBudgetDialogOpen, setIsUpdateBudgetDialogOpen } =
		useProject();

	const handleSubmit = async (values: UpdateBudgetFormValues) => {
		const { percentageDiscount, items, ...data } = values;

		await updateBudget({
			id: budget.id,
			percentageDiscount: Number(percentageDiscount),
			items: items.map((item) => ({
				...item,
				price: Number(item.price),
				quantity: Number(item.quantity),
			})),
			...data,
		});

		setIsUpdateBudgetDialogOpen(false);
	};

	const handleInsertItemButtonClick = () => {
		append({
			name: "",
			price: "0",
			quantity: "1",
			type: "ALUMINUM",
		});
	};

	const handleRemoveItemButtonClick = (index: number) => remove(index);

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsUpdateBudgetDialogOpen(false);

	return (
		<Dialog
			open={isUpdateBudgetDialogOpen}
			onOpenChange={setIsUpdateBudgetDialogOpen}>
			<DialogTrigger asChild>
				<UpdateFormTrigger />
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(event) => event.preventDefault()}
				onCloseAutoFocus={handleCloseAutoFocus}
				className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Editar dados do orçamento</DialogTitle>
					<DialogDescription>
						Altere as informações do orçamento conforme necessário.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-96">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-7 px-6">
							<DescriptionInputField form={form} path="name" />
							<DiscountInputField form={form} path="percentageDiscount" />
							<AttachmentsUrlInputField form={form} path="attachmentsUrl" />
							<BudgetItemListHeader
								onInsertItemButtonClick={handleInsertItemButtonClick}
							/>
							{fields.map((field, index) => (
								<Card
									key={field.id}
									className="bg-transparent dark:bg-secondary/30">
									<CardContent className="space-y-6">
										<DescriptionInputField
											form={form}
											path={`items.${index}.name`}
										/>
										<BudgetItemTypeSelectField
											form={form}
											path={`items.${index}.type`}
										/>
										{/* <PriceInputField
                      form={form}
                      path={`items.${index}.price`}
                    />
                    <QuantityInputField
                      form={form}
                      path={`items.${index}.quantity`}
                    /> */}
										<BudgetItemListFooter
											disableAction={fields.length <= 1}
											onRemoveItemButtonClick={() => {
												handleRemoveItemButtonClick(index);
											}}
										/>
									</CardContent>
								</Card>
							))}
							<UpdateFormActions
								disableActions={isPending}
								onCancelButtonClick={handleCancelButtonClick}
							/>
						</form>
					</Form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
