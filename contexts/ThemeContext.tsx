"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 
  | 'navy-white' 
  | 'emerald-mint' 
  | 'purple-lavender'
  | 'red-white'
  | 'blue-white'
  | 'orange-white'
  | 'teal-white'
  | 'indigo-white'
  | 'rose-white'
  | 'amber-white';

interface ThemeContextType {
  theme: Theme;
  cycleTheme: () => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEMES: Theme[] = [
  'navy-white', 
  'emerald-mint', 
  'purple-lavender',
  'red-white',
  'blue-white',
  'orange-white',
  'teal-white',
  'indigo-white',
  'rose-white',
  'amber-white'
];

const THEME_NAMES: { [key in Theme]: string } = {
  'navy-white': 'Navy & White',
  'emerald-mint': 'Emerald & Mint',
  'purple-lavender': 'Purple & Lavender',
  'red-white': 'Red & White',
  'blue-white': 'Ocean Blue',
  'orange-white': 'Sunset Orange',
  'teal-white': 'Mint Teal',
  'indigo-white': 'Deep Indigo',
  'rose-white': 'Cherry Rose',
  'amber-white': 'Golden Amber'
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('navy-white');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const initialTheme: Theme = 'navy-white';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update CSS variables based on theme
      const root = document.documentElement;
      switch(theme) {
        case 'navy-white':
          root.style.setProperty('--theme-bg-primary', '#001f3f');
          root.style.setProperty('--theme-bg-secondary', '#ffffff');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#001f3f');
          root.style.setProperty('--theme-accent', '#003d7a');
          break;
        case 'emerald-mint':
          root.style.setProperty('--theme-bg-primary', '#064e3b');
          root.style.setProperty('--theme-bg-secondary', '#a7f3d0');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#064e3b');
          root.style.setProperty('--theme-accent', '#10b981');
          break;
        case 'purple-lavender':
          root.style.setProperty('--theme-bg-primary', '#581c87');
          root.style.setProperty('--theme-bg-secondary', '#e9d5ff');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#581c87');
          root.style.setProperty('--theme-accent', '#9333ea');
          break;
        case 'red-white':
          root.style.setProperty('--theme-bg-primary', '#7f1d1d');
          root.style.setProperty('--theme-bg-secondary', '#ffffff');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#7f1d1d');
          root.style.setProperty('--theme-accent', '#dc2626');
          break;
        case 'blue-white':
          root.style.setProperty('--theme-bg-primary', '#1e3a8a');
          root.style.setProperty('--theme-bg-secondary', '#93c5fd');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#1e3a8a');
          root.style.setProperty('--theme-accent', '#2563eb');
          break;
        case 'orange-white':
          root.style.setProperty('--theme-bg-primary', '#7c2d12');
          root.style.setProperty('--theme-bg-secondary', '#fed7aa');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#7c2d12');
          root.style.setProperty('--theme-accent', '#ea580c');
          break;
        case 'teal-white':
          root.style.setProperty('--theme-bg-primary', '#134e4a');
          root.style.setProperty('--theme-bg-secondary', '#99f6e4');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#134e4a');
          root.style.setProperty('--theme-accent', '#14b8a6');
          break;
        case 'indigo-white':
          root.style.setProperty('--theme-bg-primary', '#312e81');
          root.style.setProperty('--theme-bg-secondary', '#c7d2fe');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#312e81');
          root.style.setProperty('--theme-accent', '#4f46e5');
          break;
        case 'rose-white':
          root.style.setProperty('--theme-bg-primary', '#881337');
          root.style.setProperty('--theme-bg-secondary', '#fbcfe8');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#881337');
          root.style.setProperty('--theme-accent', '#e11d48');
          break;
        case 'amber-white':
          root.style.setProperty('--theme-bg-primary', '#78350f');
          root.style.setProperty('--theme-bg-secondary', '#fde68a');
          root.style.setProperty('--theme-text-primary', '#ffffff');
          root.style.setProperty('--theme-text-secondary', '#78350f');
          root.style.setProperty('--theme-accent', '#f59e0b');
          break;
      }
    }
  }, [theme, mounted]);

  const cycleTheme = () => {
    setTheme(prev => {
      const currentIndex = THEMES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      return THEMES[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      cycleTheme,
      themeName: THEME_NAMES[theme]
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.warn('useTheme must be used within a ThemeProvider. Using default theme.');
    return { 
      theme: 'navy-white' as Theme, 
      cycleTheme: () => {},
      themeName: 'Navy & White'
    };
  }
  return context;
}
