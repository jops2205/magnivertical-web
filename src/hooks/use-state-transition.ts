type Transition<T extends string> = Readonly<Record<T, ReadonlyArray<T>>>;

export const useStateTransition = <T extends string>(
	transition: Transition<T>,
) => {
	const getNextStates = (from: T) => transition[from];

	return { getNextStates };
};
