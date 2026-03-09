import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
	storageKey: string;
	defaultTheme: Theme;
	children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export function ThemeProvider({
	storageKey,
	defaultTheme,
	children,
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		const storedTheme = localStorage.getItem(storageKey) as Theme;

		return storedTheme ?? defaultTheme;
	});

	useEffect(() => {
		const root = document.documentElement;

		root.classList.toggle("dark", theme === "dark");
	}, [theme]);

	const value: ThemeContextValue = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	return useContext(ThemeContext);
};
