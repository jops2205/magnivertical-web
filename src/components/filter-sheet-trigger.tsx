import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

type FilterSheetTriggerProps = {
	disableTrigger: boolean;
	onTriggerButtonClick: () => void;
};

export function FilterSheetTrigger({
	disableTrigger,
	onTriggerButtonClick,
}: FilterSheetTriggerProps) {
	const { isDesktop } = useMediaQuery();

	return (
		<Button
			disabled={disableTrigger}
			onClick={onTriggerButtonClick}
			size={isDesktop ? "sm" : "icon"}
			variant="outline">
			<SlidersHorizontalIcon />
			{isDesktop && "Filtros"}
		</Button>
	);
}
