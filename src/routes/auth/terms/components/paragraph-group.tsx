type ParagraphGroupProps = {
	children: React.ReactNode;
};

export function ParagraphGroup({ children }: ParagraphGroupProps) {
	return <div className="mb-12 space-y-2.5">{children}</div>;
}
