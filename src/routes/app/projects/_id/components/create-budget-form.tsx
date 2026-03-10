import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBudget } from "@/api/hooks/budgets/use-create-budget";
import { budgetItemType } from "@/api/schemas/budget-schema";
import type { Project } from "@/api/schemas/project-schema";
import { CreateFormActions } from "@/components/create-form-actions";
import { CreateFormTrigger } from "@/components/create-form-trigger";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProject } from "../contexts/project-provider";
import { AttachmentsUrlInputField } from "./attachments-url-input-field";
import { BudgetItemListFooter } from "./budget-item-list-footer";
import { BudgetItemListHeader } from "./budget-item-list-header";
import { BudgetItemTypeSelectField } from "./budget-item-type-select-field";
import { DescriptionInputField } from "./description-input-field";
import { DiscountInputField } from "./discount-input-field";
import { PriceInputField } from "./price-input-field";
import { QuantityInputField } from "./quantity-input-field";

export const createBudgetItemFormSchema = z.object({
	name: z.string().min(1, "É necessário introduzir a descrição"),
	price: z.string().min(1, "É necessário introduzir o preço"),
	quantity: z.string().min(1, "É necessário introduzir a quantidade"),
	type: z.enum(budgetItemType),
});

export const createBudgetFormSchema = z.object({
	name: z.string().min(1, "É necessário introduzir a descrição"),
	percentageDiscount: z
		.string()
		.min(1, "É necessário introduzir o desconto")
		.regex(
			/^(100|[1-9]?[0-9])$/,
			"É necessário introduzir um desconto no intervalo (0-100)",
		),
	attachmentsUrl: z.url("É necessário introduzir uma URL válida"),
	items: z.array(createBudgetItemFormSchema).min(1),
});

export type CreateBudgetFormValues = z.infer<typeof createBudgetFormSchema>;

type CreateBudgetFormProps = {
	project: Project;
	disableTrigger: boolean;
};

export function CreateBudgetForm({
	project,
	disableTrigger,
}: CreateBudgetFormProps) {
	const defaultValues: CreateBudgetFormValues = {
		name: "",
		percentageDiscount: "",
		attachmentsUrl: "",
		items: [
			{
				name: "",
				price: "",
				quantity: "",
				type: "ALUMINUM",
			},
		],
	};

	const form = useForm({
		resolver: zodResolver(createBudgetFormSchema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	const { createBudget, isPending } = useCreateBudget();

	const { isCreateBudgetDialogOpen, setIsCreateBudgetDialogOpen } =
		useProject();

	const handleSubmit = async (values: CreateBudgetFormValues) => {
		const { percentageDiscount, items, ...data } = values;

		await createBudget({
			...data,
			percentageDiscount: Number(percentageDiscount),
			items: items.map(({ price, quantity, ...item }) => ({
				price: Number(price),
				quantity: Number(quantity),
				...item,
			})),
			projectId: project.id,
		});

		setIsCreateBudgetDialogOpen(false);
	};

	const handleInsertItemButtonClick = () => {
		append({
			name: "",
			price: "",
			quantity: "",
			type: "ALUMINUM",
		});
	};

	const handleRemoveItemButtonClick = (index: number) => remove(index);

	const handleCloseAutoFocus = () => form.reset(defaultValues);
	const handleCancelButtonClick = () => setIsCreateBudgetDialogOpen(false);

	return (
		<Dialog
			open={isCreateBudgetDialogOpen}
			onOpenChange={setIsCreateBudgetDialogOpen}>
			<CreateFormTrigger target="orçamento" disableTrigger={disableTrigger} />
			<DialogContent onCloseAutoFocus={handleCloseAutoFocus} className="px-0">
				<DialogHeader className="px-6">
					<DialogTitle>Registar orçamento</DialogTitle>
					<DialogDescription>
						Preencha os dados abaixo para registar um novo orçamento.
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
										<PriceInputField
											form={form}
											path={`items.${index}.price`}
										/>
										<QuantityInputField
											form={form}
											path={`items.${index}.quantity`}
										/>
										<BudgetItemListFooter
											disableAction={fields.length <= 1}
											onRemoveItemButtonClick={() => {
												handleRemoveItemButtonClick(index);
											}}
										/>
									</CardContent>
								</Card>
							))}
							<CreateFormActions
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
