import { MailIcon, PhoneIcon, UserRoundIcon } from "lucide-react";
import { useGetCustomer } from "@/api/hooks/customers/use-get-customer";
import { CardItem } from "@/components/card-item";

type ProjectCardCustomerDetailsProps = {
	id: string;
};

export function ProjectCardCustomerDetails({
	id,
}: ProjectCardCustomerDetailsProps) {
	const { customer } = useGetCustomer(id);

	const items = [
		{
			title: "Cliente",
			content: customer?.name!,
			icon: <UserRoundIcon className="size-4.5" />,
		},
		{
			title: "Telefone",
			content: customer?.phone!,
			icon: <PhoneIcon className="size-4.5" />,
		},
		{
			title: "E-mail",
			content: customer?.email!,
			icon: <MailIcon className="size-4.5" />,
		},
	];

	return (
		<div className="flex flex-col gap-6 md:flex-row md:justify-between">
			{items.map(({ title, content, icon }) => (
				<div key={title} className="w-full">
					<CardItem title={title} content={content} icon={icon} />
				</div>
			))}
		</div>
	);
}
