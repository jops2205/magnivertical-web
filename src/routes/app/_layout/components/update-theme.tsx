import { MoonIcon, SunIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-provider";

export function UpdateTheme() {
	const { theme, setTheme } = useTheme();

	const getThemeIcon = () => {
		return theme === "dark" ? (
			<SunIcon className="size-4 text-muted-foreground" />
		) : (
			<MoonIcon className="size-4 text-muted-foreground" />
		);
	};

	const toggleTheme = () => {
		return theme === "dark" ? setTheme("light") : setTheme("dark");
	};

	return (
		<DropdownMenuItem onSelect={toggleTheme}>
			{getThemeIcon()}
			Alterar tema
		</DropdownMenuItem>
	);
}
