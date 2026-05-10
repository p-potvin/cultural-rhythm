import React, { useState, useEffect } from 'react';
import { Palette, Moon, Sun } from 'lucide-react';

const vaultThemes = [
  'golden-slate',
  'codex-solar-light',
  'midnight-blue',
  'cyber-punk',
  'forest-green',
  'ruby-red',
  'ocean-blue',
  'amethyst-purple',
  'obsidian-dark',
  'quartz-light'
];

interface ThemePickerProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function ThemePicker({ isDarkMode, setIsDarkMode }: ThemePickerProps) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('vault-theme') || (isDarkMode ? 'golden-slate' : 'codex-solar-light');
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('vault-theme', currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  const handleDarkLightToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    setCurrentTheme(newDarkMode ? 'golden-slate' : 'codex-solar-light');
  };

  return (
    <div className="relative flex items-center gap-2">
      <button 
        onClick={handleDarkLightToggle}
        className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
        title="Toggle Dark/Light Mode"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
          title="Pick Theme"
        >
          <Palette className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 p-2 w-48 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg z-50">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Vault Themes</div>
            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
              {vaultThemes.map(theme => (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTheme === theme ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                  {theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}