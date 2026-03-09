import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet";

type FilterSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
};

export function FilterSheet({
	open,
	onOpenChange,
	children,
}: FilterSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filtrar resultados</SheetTitle>
					<SheetDescription className="sr-only md:not-sr-only">
						Use os filtros abaixo para facilitar a sua pesquisa e encontrar o
						que procura.
					</SheetDescription>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
}
