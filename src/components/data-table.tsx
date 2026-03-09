import { Skeleton } from "./ui/skeleton";
import * as TablePrimitive from "./ui/table";

export type AccessorColumnDef<T> = {
	accessorKey: keyof T;
	header: string;
	cell?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type DisplayColumnDef<T> = {
	id: string;
	header?: string;
	cell: (row: T) => React.ReactNode;
};

type ColumnDef<T> = AccessorColumnDef<T> | DisplayColumnDef<T>;

type DataTableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	isLoading: boolean;
};

export function DataTable<T>({ data, columns, isLoading }: DataTableProps<T>) {
	const rows = isLoading ? Array.from({ length: 10 }) : data;

	return (
		<div className="rounded-md border">
			<TablePrimitive.Table>
				<TablePrimitive.TableHeader>
					<TablePrimitive.TableRow>
						{columns.map((column) => {
							if ("accessorKey" in column) {
								return (
									<TablePrimitive.TableHead
										key={String(column.accessorKey)}
										className="first:pl-4">
										{column.header}
									</TablePrimitive.TableHead>
								);
							}

							return (
								<TablePrimitive.TableHead key={column.id}>
									{column.header}
								</TablePrimitive.TableHead>
							);
						})}
					</TablePrimitive.TableRow>
				</TablePrimitive.TableHeader>
				<TablePrimitive.TableBody>
					{rows.length ? (
						rows.map((row, index) => (
							<TablePrimitive.TableRow
								key={isLoading ? index : JSON.stringify(row)}>
								{columns.map((column) => {
									if (isLoading) {
										return (
											<TablePrimitive.TableCell
												key={
													"accessorKey" in column
														? `${String(column.accessorKey)}-${index}`
														: `${column.id}-${index}`
												}
												className="first:pl-4">
												<Skeleton className="h-8 w-full" />
											</TablePrimitive.TableCell>
										);
									}

									if ("accessorKey" in column) {
										const cell = (row as T)[column.accessorKey];

										return (
											<TablePrimitive.TableCell
												key={String(column.accessorKey)}
												className="first:pl-4">
												{column.cell
													? column.cell(cell, row as T)
													: String(cell)}
											</TablePrimitive.TableCell>
										);
									}

									return (
										<TablePrimitive.TableCell
											key={column.id}
											className="flex justify-end">
											{column.cell(row as T)}
										</TablePrimitive.TableCell>
									);
								})}
							</TablePrimitive.TableRow>
						))
					) : (
						<TablePrimitive.TableRow>
							<TablePrimitive.TableCell
								colSpan={columns.length}
								className="h-24 text-center">
								Sem resultados
							</TablePrimitive.TableCell>
						</TablePrimitive.TableRow>
					)}
				</TablePrimitive.TableBody>
			</TablePrimitive.Table>
		</div>
	);
}
