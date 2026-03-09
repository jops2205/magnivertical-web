import { AlignLeftIcon, CircleDashedIcon } from "lucide-react";
import { Link } from "react-router";
import { useDeleteProject } from "@/api/hooks/projects/use-delete-project";
import { useUpdateProjectStatus } from "@/api/hooks/projects/use-update-project-status";
import type { Project, ProjectStatus } from "@/api/schemas/project-schema";
import { DataTableRowActionsTrigger } from "@/components/data-table-row-actions-trigger";
import { DeleteDialogActions } from "@/components/delete-dialog-actions";
import { DeleteDialogTrigger } from "@/components/delete-dialog-trigger";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { useStateTransition } from "@/hooks/use-state-transition";
import { projectStatusOptions } from "@/utils/project-status";
import { UpdateProjectForm } from "./update-project-form";

type ProjectTableRowActionsProps = {
	row: Project;
};

export function ProjectTableRowActions({ row }: ProjectTableRowActionsProps) {
	const { user } = useCurrentUser();
	const { deleteProject, isPending: isDeletePending } = useDeleteProject();

	const { updateProjectStatus, isPending: isUpdateStatusPending } =
		useUpdateProjectStatus();

	const { getNextStates } = useStateTransition<ProjectStatus>({
		PLANNED: ["IN_PROGRESS"],
		IN_PROGRESS: ["COMPLETED", "CANCELED"],
		COMPLETED: [],
		CANCELED: [],
	});

	const isPending = isDeletePending || isUpdateStatusPending;

	const nextStates = getNextStates(row.status);

	const handleStatusTransition = async (
		status: ProjectStatus,
		isAllowed: boolean,
	) => {
		if (isAllowed) {
			await updateProjectStatus({ id: row.id, status });
		}
	};

	const handleDeleteButtonClick = async () => await deleteProject(row.id);

	return (
		<DropdownMenu>
			<DataTableRowActionsTrigger />
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuItem asChild onSelect={(event) => event.preventDefault()}>
					<Link to={`/projects/${row.id}`}>
						<AlignLeftIcon />
						Visualizar
					</Link>
				</DropdownMenuItem>
				{nextStates.length > 0 && (
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<CircleDashedIcon className="size-4 text-muted-foreground" />
							Editar status
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuGroup>
								{projectStatusOptions
									.filter(({ value }) => value !== "PLANNED")
									.map(({ value, key }) => {
										const isAllowed = nextStates.includes(value);

										return (
											<DropdownMenuItem
												key={value}
												disabled={!isAllowed}
												onClick={() => {
													handleStatusTransition(value, isAllowed);
												}}>
												{key}
											</DropdownMenuItem>
										);
									})}
							</DropdownMenuGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				)}
				<UpdateProjectForm project={row} />
				{user?.role === "MANAGER" && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<DeleteDialogTrigger />
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Apagar obra</AlertDialogTitle>
								<AlertDialogDescription>
									Esta operação não pode ser desfeita. A obra e todas as suas
									informações associadas serão removidos permanentemente.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<DeleteDialogActions
								disableActions={isPending}
								onDeleteButtonClick={handleDeleteButtonClick}
							/>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
