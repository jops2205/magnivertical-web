import { useGetProjectFollowUps } from "@/api/hooks/projects/use-get-project-follow-ups";
import type { Project } from "@/api/schemas/project-schema";
import { DataTable } from "@/components/data-table";
import { followUpsTableColumns } from "./follow-up-table-columns";

type FollowUpTableProps = {
	project: Project;
};

export function FollowUpTable({ project }: FollowUpTableProps) {
	const { followUps, isFetching } = useGetProjectFollowUps(project.id);

	return (
		<div className="space-y-4">
			<h2 className="font-bold text-2xl tracking-tight">Follow-ups</h2>
			<DataTable
				data={followUps}
				columns={followUpsTableColumns}
				isLoading={isFetching}
			/>
		</div>
	);
}
