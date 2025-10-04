import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@stores/settingsStore';
import { Language, ThemeMode } from '@models/Article';
import { Sun, Moon, Globe, Sparkles } from 'lucide-react';
import { SearchBar } from '@components/SearchBar/SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Modern Header Component with Glassmorphism
 * Displays app branding, search, and controls with contemporary design
 */
export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { t, i18n } = useTranslation();
  const { theme, language, toggleTheme, setLanguage } = useSettingsStore();

  const handleLanguageChange = () => {
    const newLang = language === Language.EN ? Language.TR : Language.EN;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-purple-200/50 dark:border-purple-800/30 shadow-lg transition-all">
      {/* Gradient Accent Line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-x" />
      
      <div className="container mx-auto px-6 py-3">
        {/* Single Row: Logo, SearchBar, Controls */}
        <div className="flex items-center justify-between gap-6">
          {/* Logo/Title - Modern Branding */}
          <div className="flex items-center space-x-4 group flex-shrink-0">
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              {/* Logo */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Explore • Learn • Discover</p>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Controls - Modern Pills */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className="group flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/40 dark:hover:to-pink-800/40 transition-all duration-300 border border-purple-200/50 dark:border-purple-700/50 shadow-md hover:shadow-lg"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group relative p-2.5 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-yellow-200 hover:to-orange-200 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 transition-all duration-300 border border-yellow-200/50 dark:border-blue-700/50 shadow-md hover:shadow-lg overflow-hidden"
              aria-label="Toggle theme"
            >
              {theme === ThemeMode.LIGHT ? (
                <Moon className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform" />
              )}
              
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-white/20 dark:bg-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
