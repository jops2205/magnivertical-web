import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

type CreateFormTriggerProps = {
	target: string;
	disableTrigger: boolean;
};

export function CreateFormTrigger({
	target,
	disableTrigger,
}: CreateFormTriggerProps) {
	const { isDesktop } = useMediaQuery();

	return (
		<DialogTrigger asChild>
			<Button disabled={disableTrigger} size={isDesktop ? "default" : "icon"}>
				{isDesktop ? <PlusCircleIcon /> : <PlusIcon />}
				{isDesktop && `Registar ${target}`}
			</Button>
		</DialogTrigger>
	);
}
