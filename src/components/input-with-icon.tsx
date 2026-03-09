import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type InputWithIconProps = React.ComponentProps<"input"> & {
	icon: React.ReactNode;
	align?: "start" | "end";
};

export function InputWithIcon({
	className,
	icon,
	align = "end",
	...props
}: InputWithIconProps) {
	return (
		<div className="relative">
			<Input
				className={cn(
					"peer",
					align === "start" && "ps-9",
					align === "end" && "end-0 pe-9",
					className,
				)}
				{...props}
			/>
			<div
				className={cn(
					"pointer-events-none absolute inset-y-0 flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50",
					align === "start" && "start-0 ps-3",
					align === "end" && "end-0 pe-3",
				)}>
				{icon}
			</div>
		</div>
	);
}
