import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import type { Project } from "@/api/schemas/project-schema";
import { Button } from "@/components/ui/button";
import { BudgetTable } from "./budget-table";
import { FollowUpTable } from "./follow-up-table";
import { ProjectCard } from "./project-card";

type ProjectContentProps = {
	project: Project;
};

export function ProjectContent({ project }: ProjectContentProps) {
	useEffect(() => {
		document.title = project.name;
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-6">
				<Button variant="outline" size="icon" asChild>
					<Link to="/projects" className="cursor-default">
						<ArrowLeftIcon />
					</Link>
				</Button>
				<div className="flex w-full items-center justify-between">
					<div className="flex flex-col gap-1.5">
						<h1 className="font-bold text-3xl tracking-tight">
							{project.name}
						</h1>
						<span className="font-medium">{project.code}</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<ProjectCard project={project} />
				<div className="w-full space-y-6">
					<BudgetTable project={project} />
					<FollowUpTable project={project} />
				</div>
			</div>
		</div>
	);
}
