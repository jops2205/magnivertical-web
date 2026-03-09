import {
	CalendarIcon,
	ChartNoAxesColumnIcon,
	ClockIcon,
	MapPinIcon,
} from "lucide-react";
import type { Project } from "@/api/schemas/project-schema";
import { CardItem } from "@/components/card-item";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getDistrict } from "@/utils/districts";
import { formatDate } from "@/utils/funcs/formatters";
import { getProjectStatus } from "@/utils/project-status";
import { ProjectCardCustomerDetails } from "./project-card-customer-details";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	const { isDesktop } = useMediaQuery();
	const { address } = project;

	const complement = address.complement ? `${address.complement},` : "";

	const items = [
		{
			title: "Iniciada em",
			content: formatDate(project.startedAt),
			icon: <CalendarIcon className="size-4.5" />,
		},
		{
			title: "Finalizada em",
			content: project.endedAt ? formatDate(project.endedAt) : "—",
			icon: <ClockIcon className="size-4.5" />,
		},
		{
			title: "Morada",
			content: `${address.street}, ${complement} ${address.postalCode}, ${getDistrict(address.district)}`,
			icon: <MapPinIcon className="size-4.5" />,
		},
	];

	return (
		<Card>
			<CardHeader className="md:flex md:justify-between">
				<div className="flex flex-col gap-2">
					<CardTitle>Detalhes da obra</CardTitle>
					<CardDescription>
						Visão geral do progresso e estado atual da obra.
					</CardDescription>
				</div>
				{isDesktop && <Badge>{getProjectStatus(project.status)}</Badge>}
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				{project.customerId && (
					<ProjectCardCustomerDetails id={project.customerId} />
				)}
				<div className="flex flex-col gap-6 md:flex-row md:justify-between">
					{!isDesktop && (
						<div className="w-full">
							<CardItem
								title="Status"
								content={getProjectStatus(project.status)}
								icon={<ChartNoAxesColumnIcon className="size-4.5" />}
							/>
						</div>
					)}
					{items.map(({ title, content, icon }) => (
						<div key={title} className="w-full">
							<CardItem title={title} content={content} icon={icon} />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
