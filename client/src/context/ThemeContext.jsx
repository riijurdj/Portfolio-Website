import { createContext, useContext, useEffect, useState } from 'react';
import { FiMoon, FiZap } from 'react-icons/fi';

// Registry of available themes. Add new entries here (plus a matching
// `:root[data-theme='id'] { ... }` block in index.css) to introduce more themes later.
export const THEMES = [
  { id: 'dark', label: 'Dark', icon: FiMoon },
  { id: 'neon-green', label: 'Neon Green', icon: FiZap },
];

export const STORAGE_KEY = 'portfolio-theme';
export const DEFAULT_THEME = 'dark';

const ThemeContext = createContext(null);

function resolveInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return THEMES.some((t) => t.id === stored) ? stored : DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (id) => {
    if (THEMES.some((t) => t.id === id)) setThemeState(id);
  };

  const toggleTheme = () => {
    setThemeState((current) => {
      const index = THEMES.findIndex((t) => t.id === current);
      const next = THEMES[(index + 1) % THEMES.length];
      return next.id;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
