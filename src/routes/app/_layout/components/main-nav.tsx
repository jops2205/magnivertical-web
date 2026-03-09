import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import type { UserRole } from "@/api/schemas/user-schema";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type NavigationItem = {
	text: string;
	url: string;
	roles: UserRole[];
};

type NavigationProps = {
	items: NavigationItem[];
	role?: UserRole;
	onNavigate: () => void;
};

function Navigation({ items, role, onNavigate }: NavigationProps) {
	return (
		<nav>
			<ul className="flex flex-col gap-6 md:flex-row md:items-center md:gap-4 lg:gap-6">
				{items
					.filter(({ roles }) => role && roles.includes(role))
					.map(({ text, url }) => (
						<li key={url}>
							<NavLink
								to={url}
								onClick={onNavigate}
								className={({ isActive }) => {
									return cn(
										"font-medium text-sm outline-none transition-colors hover:text-primary focus:text-foreground",
										isActive
											? "hover:text-foreground!"
											: "text-muted-foreground",
									);
								}}>
								{text}
							</NavLink>
						</li>
					))}
			</ul>
		</nav>
	);
}

export function MainNav() {
	const { user } = useCurrentUser();
	const { isDesktop } = useMediaQuery();

	const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(false);

	const items: NavigationItem[] = [
		{
			text: "Painel de Controlo",
			url: "/",
			roles: ["MANAGER"],
		},
		{
			text: "Colaboradores",
			url: "/users",
			roles: ["MANAGER"],
		},
		{
			text: "Tarefas",
			url: "/tasks",
			roles: ["MANAGER", "ASSISTANT", "OPERATOR"],
		},
		{
			text: "Clientes",
			url: "/customers",
			roles: ["MANAGER", "ASSISTANT"],
		},
		{
			text: "Obras",
			url: "/projects",
			roles: ["MANAGER", "ASSISTANT"],
		},
		{
			text: "Serviços",
			url: "/services",
			roles: ["OPERATOR"],
		},
	];

	const handleNavigate = () => setIsNavigationDrawerOpen(false);

	return (
		<>
			{isDesktop ? (
				<Navigation
					items={items}
					role={user?.role}
					onNavigate={handleNavigate}
				/>
			) : (
				<Drawer
					open={isNavigationDrawerOpen}
					onOpenChange={setIsNavigationDrawerOpen}>
					<DrawerTrigger asChild>
						<Button size={isDesktop ? "icon-sm" : "icon"} variant="outline">
							<MenuIcon />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="px-6 pb-6 outline-none">
						<DrawerHeader className="sr-only">
							<DrawerTitle>Menu principal</DrawerTitle>
							<DrawerDescription>
								Navegação entre as páginas principais do painel
							</DrawerDescription>
						</DrawerHeader>
						<div className="mt-4">
							<Navigation
								items={items}
								role={user?.role}
								onNavigate={handleNavigate}
							/>
						</div>
					</DrawerContent>
				</Drawer>
			)}
		</>
	);
}
