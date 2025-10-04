import { Search, Satellite } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * NASA Space-Themed SearchBar Component
 * Mission scanner interface with space aesthetics
 */
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full group">
      {/* Orbital glow effect when focused */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${isFocused ? 'opacity-60 animate-pulse' : ''}`} />
      
      {/* Search container */}
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
          <Search className={`w-5 h-5 transition-all duration-300 text-blue-600 dark:text-blue-400 ${
            isFocused ? 'scale-110' : ''
          }`} />
        </div>

        {/* Satellite scanning icon when typing */}
        {value && (
          <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
            <Satellite className="w-4 h-4 text-blue-500 dark:text-blue-400 animate-pulse" />
          </div>
        )}

        {/* Input field - Scanner style */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('header.search')}
          className={`
            w-full pl-14 pr-14 py-3 
            bg-white/95 dark:bg-gray-900/95 
            backdrop-blur-xl
            border-2 transition-all duration-300
            ${isFocused 
              ? 'border-blue-400 dark:border-blue-500 shadow-2xl shadow-blue-500/30' 
              : 'border-blue-200/50 dark:border-blue-700/30 shadow-lg'
            }
            rounded-2xl 
            text-gray-800 dark:text-white 
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none 
            font-medium
            hover:border-blue-300 dark:hover:border-blue-600
          `}
        />
      </div>
    </div>
  );
};
