import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export const THEME_KEY = 'mahesh.os.theme';
const THEME_COLOR: Record<Theme, string> = { dark: '#0a0b0d', light: '#f7f8fa' };

function readStored(): Theme | null {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

/**
 * Dark/light theme. Order of precedence: explicit choice (localStorage) ->
 * OS preference -> dark. The inline script in index.html applies the same
 * rule before first paint so there's no flash; this hook keeps it in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStored() ?? systemTheme());

  useEffect(() => {
    apply(theme);
  }, [theme]);

  // Follow OS changes only while the visitor hasn't picked a theme explicitly.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (!readStored()) setTheme(mq.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* storage unavailable - preference lasts for this page only */
      }
      const root = document.documentElement;
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.classList.add('theme-transition');
        window.setTimeout(() => root.classList.remove('theme-transition'), 260);
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
