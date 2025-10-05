import { Search, Satellite, FileText, UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  searchInContent: boolean;
  onSearchInContentChange: (value: boolean) => void;
  searchByAuthor: boolean;
  onSearchByAuthorChange: (value: boolean) => void;
}

/**
 * NASA Space-Themed SearchBar Component
 * Mission scanner interface with space aesthetics
 * Features: Title-only search or deep content search toggle
 */
export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  searchInContent, 
  onSearchInContentChange,
  searchByAuthor,
  onSearchByAuthorChange
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  // Handle Author Search toggle - deactivate Content Search if Author is activated
  const handleAuthorSearchToggle = () => {
    if (!searchByAuthor) {
      // Activating author search - deactivate content search
      onSearchInContentChange(false);
      onSearchByAuthorChange(true);
    } else {
      // Deactivating author search
      onSearchByAuthorChange(false);
    }
  };

  // Handle Content Search toggle - deactivate Author Search if Content is activated
  const handleContentSearchToggle = () => {
    if (!searchInContent) {
      // Activating content search - deactivate author search
      onSearchByAuthorChange(false);
      onSearchInContentChange(true);
    } else {
      // Deactivating content search
      onSearchInContentChange(false);
    }
  };

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
          <div className="absolute inset-y-0 right-32 flex items-center pointer-events-none">
            <Satellite className="w-4 h-4 text-blue-500 dark:text-blue-400 animate-pulse" />
          </div>
        )}

        {/* Toggle Buttons Container */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2 z-20">
          {/* Author Search Toggle Button */}
          <button
            onClick={handleAuthorSearchToggle}
            className={`
              relative p-2.5 rounded-xl transition-all duration-300
              backdrop-blur-md z-20
              ${searchByAuthor
                ? 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white shadow-lg shadow-amber-500/30'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-white/90 dark:hover:bg-gray-700/90'
              }
              border-2 ${searchByAuthor 
                ? 'border-amber-400/50 dark:border-amber-500/50' 
                : 'border-gray-300/50 dark:border-gray-600/50'
              }
              hover:scale-105 active:scale-95
              group/btn
            `}
            title={searchByAuthor ? t('header.searchByAuthorOn') : t('header.searchByAuthorOff')}
          >
            {/* Icon with transition */}
            <div className="relative w-5 h-5">
              <UserCircle 
                className={`w-5 h-5 transition-all duration-300 ${
                  searchByAuthor 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-40 scale-95'
                }`}
              />
            </div>

            {/* Pulse effect when active */}
            {searchByAuthor && (
              <div className="absolute inset-0 rounded-xl bg-amber-400/30 animate-ping" />
            )}
          </button>

          {/* Content Search Toggle Button */}
          <button
            onClick={handleContentSearchToggle}
            className={`
              relative p-2.5 rounded-xl transition-all duration-300
              backdrop-blur-md z-20
              ${searchInContent
                ? 'bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-white/90 dark:hover:bg-gray-700/90'
              }
              border-2 ${searchInContent 
                ? 'border-purple-400/50 dark:border-purple-500/50' 
                : 'border-gray-300/50 dark:border-gray-600/50'
              }
              hover:scale-105 active:scale-95
              group/btn
            `}
            title={searchInContent ? t('header.searchInContentOn') : t('header.searchInContentOff')}
          >
            {/* Icon with transition */}
            <div className="relative w-5 h-5">
              <FileText 
                className={`w-5 h-5 transition-all duration-300 ${
                  searchInContent 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-40 scale-95'
                }`}
              />
            </div>

            {/* Pulse effect when active */}
            {searchInContent && (
              <div className="absolute inset-0 rounded-xl bg-purple-400/30 animate-ping" />
            )}
          </button>
        </div>

        {/* Input field - Scanner style */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('header.search')}
          className={`
            w-full pl-14 pr-32 py-3 
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
            relative z-10
          `}
        />
      </div>
    </div>
  );
};
