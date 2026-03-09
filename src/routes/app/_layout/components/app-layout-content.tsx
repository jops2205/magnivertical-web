import { Outlet } from "react-router";
import { useCurrentUser } from "@/contexts/current-user-provider";
import { LoadingScreen } from "./loading-screen";
import { MainNav } from "./main-nav";
import { NotificationBell } from "./notification-bell";
import { UserNav } from "./user-nav";
import { VerifyEmail } from "./verify-email";

export function AppLayoutContent() {
	const { user, isFetching } = useCurrentUser();

	if (isFetching) {
		return <LoadingScreen isLoading={isFetching} />;
	}

	if (!user?.verified) {
		return <VerifyEmail />;
	}

	return (
		<div className="flex min-h-svh flex-col">
			<header className="flex h-16 items-center justify-between border-b px-4">
				<MainNav />
				<div className="flex items-center gap-4">
					<NotificationBell />
					<UserNav />
				</div>
			</header>
			<main className="flex flex-1 flex-col px-8 pt-6 pb-8">
				<Outlet />
			</main>
		</div>
	);
}
