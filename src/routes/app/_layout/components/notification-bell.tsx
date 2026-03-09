import { BellIcon } from "lucide-react";
import { useGetNotifications } from "@/api/hooks/notifications/use-get-notifications";
import { useReadNotifications } from "@/api/hooks/notifications/use-read-notifications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { NotificationCard } from "./notification-card";

export function NotificationBell() {
	const { notifications } = useGetNotifications();
	const { readNotifications } = useReadNotifications();
	const { isDesktop } = useMediaQuery();

	const unreadNotificationCount = notifications.filter(
		(notification) => !notification.read,
	).length;

	const handleReadNotifications = async () => await readNotifications();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size={isDesktop ? "icon-sm" : "icon"}
					variant="outline"
					className="relative">
					<BellIcon className="size-4" />
					{unreadNotificationCount > 0 && (
						<Badge
							variant="destructive"
							className="-top-2 -translate-x-1/2 absolute left-full size-5 rounded-full px-1 text-[0.625rem]">
							{unreadNotificationCount}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="ml-8 p-0 sm:w-96" align="end">
				<div className="flex items-center justify-between gap-4 px-4 py-3">
					<span className="font-semibold text-sm">Notificações</span>
					{notifications.length > 0 && (
						<button
							type="button"
							disabled={!unreadNotificationCount}
							onClick={handleReadNotifications}
							className="cursor-pointer font-medium text-xs enabled:hover:underline disabled:cursor-default disabled:text-muted-foreground">
							Marcar tudo como lido
						</button>
					)}
				</div>
				<Separator />
				{notifications.length > 0 ? (
					<ScrollArea className="h-96 **:data-[slot=scroll-area-scrollbar]:hidden">
						<div className="space-y-1 p-1">
							{notifications.map((notification) => (
								<NotificationCard
									key={notification.id}
									notification={notification}
								/>
							))}
						</div>
					</ScrollArea>
				) : (
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<BellIcon />
							</EmptyMedia>
							<EmptyTitle>Sem notificações</EmptyTitle>
							<EmptyDescription>
								Está tudo em dia. Novas notificações serão apresentadas aqui.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			</PopoverContent>
		</Popover>
	);
}
