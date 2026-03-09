type ParagraphSubgroupProps = {
	children: React.ReactNode;
};

export function ParagraphSubgroup({ children }: ParagraphSubgroupProps) {
	return <div className="space-y-0.5">{children}</div>;
}
