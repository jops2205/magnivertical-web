import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputWithIcon } from "./input-with-icon";

export function SearchInput({
	className,
	...props
}: React.ComponentProps<"input">) {
	return (
		<InputWithIcon
			icon={<SearchIcon className="size-4" />}
			align="start"
			className={cn("md:h-8", className)}
			{...props}
		/>
	);
}
