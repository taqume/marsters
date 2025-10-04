import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * SearchBar Component
 * Provides search functionality for filtering articles
 */
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('header.search')}
        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-surface border-2 border-gray-200 dark:border-dark-border rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
      />
    </div>
  );
};
