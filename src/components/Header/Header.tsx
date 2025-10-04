import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@stores/settingsStore';
import { Language, ThemeMode } from '@models/Article';
import { Sun, Moon, Globe } from 'lucide-react';

/**
 * Header Component
 * Displays app title, language switcher, and theme toggle
 */
export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, language, toggleTheme, setLanguage } = useSettingsStore();

  const handleLanguageChange = () => {
    const newLang = language === Language.EN ? Language.TR : Language.EN;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-bg shadow-md transition-colors">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🧬</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('header.title')}
            </h1>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
              aria-label="Toggle theme"
            >
              {theme === ThemeMode.LIGHT ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
