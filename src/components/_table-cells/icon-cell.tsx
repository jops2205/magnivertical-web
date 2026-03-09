type IconCellProps = {
	text: string;
	icon: React.ReactNode;
};

export function IconCell({ text, icon }: IconCellProps) {
	return (
		<div className="flex items-center gap-2">
			{icon}
			{text}
		</div>
	);
}
