import { useEffect, useState } from "react";
import { useQueryString } from "@/hooks/use-query-string";

export const useSearchValue = () => {
	const [queryString, setQueryString] = useQueryString();
	const { search } = queryString;

	const [searchValue, setSearchValue] = useState(search ?? "");

	useEffect(() => setSearchValue(search ?? ""), [search]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const currentValue = search ?? "";

			setQueryString({
				search: searchValue ?? "",
				...(currentValue !== searchValue && { page: "1" }),
			});
		}, 300);

		return () => clearTimeout(timeout);
	}, [search, searchValue, setQueryString]);

	return [searchValue, setSearchValue] as const;
};
