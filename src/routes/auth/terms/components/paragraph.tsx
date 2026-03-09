type ParagraphProps = {
	children: React.ReactNode;
};

export function Paragraph({ children }: ParagraphProps) {
	return <p className="text-muted-foreground">{children}</p>;
}
