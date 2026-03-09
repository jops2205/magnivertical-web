type SubtitleProps = {
	children: React.ReactNode;
};

export function Subtitle({ children }: SubtitleProps) {
	return <h3 className="mb-4 font-semibold">{children}</h3>;
}
