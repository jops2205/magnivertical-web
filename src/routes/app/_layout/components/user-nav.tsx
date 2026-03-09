import { LogOutIcon } from "lucide-react";
import { useSignOut } from "@/api/hooks/session/use-sign-out";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getInitials } from "@/utils/funcs/get-initials";
import { UpdateEmailForm } from "./update-email-form";
import { UpdatePasswordForm } from "./update-password-form";
import { UpdateTheme } from "./update-theme";

export function UserNav() {
	const { user } = useCurrentUser();
	const { signOut, isPending } = useSignOut();
	const { isDesktop } = useMediaQuery();

	const handleSignOut = async () => await signOut();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={isDesktop ? "icon-sm" : "icon"} variant="outline">
					{user?.name && getInitials(user.name)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48" align="end">
				<DropdownMenuLabel>
					<span className="block font-medium text-sm">{user?.name}</span>
					<span className="block text-muted-foreground text-xs">
						{user?.email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<UpdateEmailForm />
				<UpdatePasswordForm />
				<UpdateTheme />
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={handleSignOut} disabled={isPending}>
					<LogOutIcon />
					Terminar sessão
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
