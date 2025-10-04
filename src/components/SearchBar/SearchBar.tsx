import { Search, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Modern SearchBar Component with Glassmorphism
 * Animated search with visual feedback
 */
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full group">
      {/* Glow effect when focused */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${isFocused ? 'opacity-50' : ''}`} />
      
      {/* Search container */}
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'text-purple-500 scale-110' : 'text-gray-800 dark:text-white'}`} />
        </div>

        {/* Magic sparkles when typing */}
        {value && (
          <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          </div>
        )}

        {/* Input field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('header.search')}
          className={`
            w-full pl-14 pr-14 py-3 
            bg-white/90 dark:bg-gray-800/90 
            backdrop-blur-xl
            border-2 transition-all duration-300
            ${isFocused 
              ? 'border-purple-400 dark:border-purple-500 shadow-2xl shadow-purple-500/20' 
              : 'border-gray-200/50 dark:border-gray-700/50 shadow-lg'
            }
            rounded-2xl 
            text-gray-800 dark:text-white 
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none 
            font-medium
            hover:border-purple-300 dark:hover:border-purple-600
          `}
        />

        {/* Animated underline */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 ${isFocused ? 'w-full' : 'w-0'}`} />
      </div>

      {/* Helper text */}
      {isFocused && !value && (
        <div className="absolute top-full mt-2 left-0 right-0 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 animate-fade-in">
            Search by title, author, or category...
          </p>
        </div>
      )}
    </div>
  );
};
