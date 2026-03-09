import { useEffect, useState } from "react";

export const useMediaQuery = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	});

	const isDesktop = width >= 768;

	return { width, isDesktop };
};
