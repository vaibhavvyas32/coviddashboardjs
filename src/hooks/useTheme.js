import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const readInitialTheme = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");

/** Light/dark theme stored in localStorage and applied as a class on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((current) => (current === "dark" ? "light" : "dark")), []);

  return { theme, isDark: theme === "dark", setTheme, toggleTheme };
}
