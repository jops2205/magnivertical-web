import { useSearchParams } from "react-router";

type QueryString = Record<string, string>;

type SetQueryString = (
	queryString: Partial<Record<string, string | undefined | null>>,
) => void;

export const useQueryString = (): [QueryString, SetQueryString] => {
	const [searchParams, setSearchParams] = useSearchParams();

	const parseQueryString = (): QueryString => {
		const params: Record<string, string> = {};

		for (const [key, value] of searchParams.entries()) {
			params[key] = value;
		}

		return params;
	};

	const setQueryString: SetQueryString = (queryString) => {
		const params = new URLSearchParams(window.location.search);

		for (const [key, value] of Object.entries(queryString)) {
			if (value === undefined || value === "" || value === null) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		}

		setSearchParams(params, { replace: false });
	};

	const queryString = parseQueryString();

	return [queryString, setQueryString];
};
