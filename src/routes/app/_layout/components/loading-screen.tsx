import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type LoadingScreenProps = {
	isLoading: boolean;
};

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setIsVisible(true);
		}
	}, [isLoading]);

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-background">
			<Spinner className="size-14" />
		</div>
	);
}
