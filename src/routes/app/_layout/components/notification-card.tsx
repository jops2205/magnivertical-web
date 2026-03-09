import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { useReadNotification } from "@/api/hooks/notifications/use-read-notification";
import type { Notification } from "@/api/schemas/notification-schema";
import { capitalizeFirstLetter } from "@/utils/funcs/capitalize-first-letter";

type NotificationCardProps = {
	notification: Notification;
};

export function NotificationCard({ notification }: NotificationCardProps) {
	const { readNotification } = useReadNotification();

	const handleReadNotification = async () => {
		await readNotification(notification.id);
	};

	return (
		<button
			type="button"
			disabled={notification.read}
			onClick={handleReadNotification}
			className="w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
			<div className="flex items-center justify-between text-left">
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<span className="font-medium text-sm">{notification.title}</span>
						<span className="line-clamp-2 max-w-xs text-muted-foreground text-xs">
							{notification.description}
						</span>
					</div>
					<span className="text-muted-foreground text-xs">
						{capitalizeFirstLetter(
							formatDistanceToNow(notification.createdAt, {
								locale: pt,
								addSuffix: true,
							}),
						)}
					</span>
				</div>
				{!notification.read && (
					<div className="size-1.5 rounded-full bg-foreground" />
				)}
			</div>
		</button>
	);
}
