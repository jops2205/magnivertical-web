type CardItemProps = {
	title: string;
	content: string;
	icon: React.ReactNode;
};

export function CardItem({ title, content, icon }: CardItemProps) {
	return (
		<div className="flex items-start gap-2">
			<div className="flex min-h-9 min-w-9 items-center justify-center rounded-full bg-input">
				{icon}
			</div>
			<div className="flex flex-col">
				<span className="text-muted-foreground text-xs">{title}</span>
				<span className="select-none font-semibold text-sm">{content}</span>
			</div>
		</div>
	);
}
