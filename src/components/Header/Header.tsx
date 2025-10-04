import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@stores/settingsStore';
import { Language, ThemeMode } from '@models/Article';
import { Sun, Moon, Globe, Rocket } from 'lucide-react';
import { SearchBar } from '@components/SearchBar/SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * NASA Space-Themed Header Component
 * Mission control inspired design with space aesthetics
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-gray-950/70 border-b border-blue-200/30 dark:border-blue-400/20 shadow-2xl transition-all">
      {/* Space Mission Accent Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 animate-gradient-x relative overflow-hidden">
        {/* Scanning line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }} />
      </div>
      
      <div className="container mx-auto px-6 py-3">
        {/* Single Row: Logo, SearchBar, Controls */}
        <div className="flex items-center justify-between gap-6">
          {/* NASA-Style Logo */}
          <div className="flex items-center space-x-4 group flex-shrink-0">
            <div className="relative">
              {/* Orbital glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity animate-pulse" />
              {/* Logo Container */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-blue-400/30">
                <Rocket className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
                {/* Sparkle effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-400 dark:via-purple-400 dark:to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                {t('header.title')}
              </h1>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono tracking-wider uppercase">Explore • Learn • Discover</p>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[500px]">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Controls - Space Mission Style */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className="group flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 transition-all duration-300 border border-blue-300/50 dark:border-blue-400/30 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 w-20"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 font-mono">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle - Day/Night Cycle */}
            <button
              onClick={toggleTheme}
              className="group relative p-2.5 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-blue-900/40 dark:to-indigo-900/40 hover:from-yellow-200 hover:to-orange-200 dark:hover:from-blue-800/50 dark:hover:to-indigo-800/50 transition-all duration-300 border border-yellow-300/50 dark:border-blue-400/30 shadow-lg hover:shadow-xl hover:shadow-yellow-500/20 dark:hover:shadow-blue-500/20 overflow-hidden"
              aria-label="Toggle theme"
            >
              {theme === ThemeMode.LIGHT ? (
                <Moon className="w-5 h-5 text-indigo-700 group-hover:rotate-12 transition-transform relative z-10" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform relative z-10" />
              )}
              
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 rounded-full blur-sm" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
