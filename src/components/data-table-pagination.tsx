import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQueryString } from "@/hooks/use-query-string";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type DataTablePaginationProps = {
	page: number;
	perPage: number;
	itemsCount: number;
	isLoading: boolean;
	onPageChange?: (page: number) => void;
	onPerPageChange?: (perPage: number) => void;
};

export function DataTablePagination({
	page,
	perPage,
	itemsCount,
	isLoading,
	onPageChange,
	onPerPageChange,
}: DataTablePaginationProps) {
	const pagesCount = Math.ceil(itemsCount / Number(perPage));

	const [_, setQueryString] = useQueryString();
	const { isDesktop } = useMediaQuery();

	const handlePageChange = onPageChange
		? onPageChange
		: (page: number) => {
				setQueryString({ page: page.toString() });
			};

	const handlePerPageChange = onPerPageChange
		? onPerPageChange
		: (perPage: number) => {
				setQueryString({
					page: "1",
					perPage: perPage.toString(),
				});
			};

	return (
		<div className="flex justify-end">
			<div className="flex items-center gap-6 lg:gap-8">
				<div className="hidden items-center gap-2 lg:flex">
					<p className="font-medium text-sm">Registos por página</p>
					<Select
						disabled={isLoading}
						value={perPage.toString()}
						onValueChange={(value) => handlePerPageChange(Number(value))}>
						<SelectTrigger size="sm" className="w-[68px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((perPage) => (
								<SelectItem key={perPage} value={perPage.toString()}>
									{perPage}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-24 items-center justify-center font-medium text-sm">
					{isLoading ? (
						<Skeleton className="h-8 w-full" />
					) : pagesCount === 0 ? (
						"Página 0 de 0"
					) : (
						`Página ${page} de ${pagesCount}`
					)}
				</div>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="icon-sm"
						disabled={isLoading || page <= 1}
						onClick={() => handlePageChange(1)}
						className="hidden p-0 md:flex">
						<ChevronsLeft />
					</Button>
					<Button
						type="button"
						variant="outline"
						size={isDesktop ? "icon-sm" : "icon"}
						disabled={isLoading || page <= 1}
						onClick={() => handlePageChange(page - 1)}
						className="p-0">
						<ChevronLeft />
					</Button>
					<Button
						type="button"
						variant="outline"
						size={isDesktop ? "icon-sm" : "icon"}
						disabled={isLoading || page >= pagesCount}
						onClick={() => handlePageChange(page + 1)}
						className="p-0">
						<ChevronRight />
					</Button>
					<Button
						type="button"
						variant="outline"
						size="icon-sm"
						disabled={isLoading || page >= pagesCount}
						onClick={() => handlePageChange(pagesCount)}
						className="hidden p-0 md:flex">
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
