import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '@models/Article';
import { articleService } from '@services/ArticleService';
import { useSettingsStore } from '@stores/settingsStore';
import { Header } from '@components/Header/Header';
import { Bookshelf } from '@components/Bookshelf/Bookshelf';
import { ArticleViewer } from '@components/ArticleViewer/ArticleViewer';
import './i18n/config';

/**
 * Main App Component
 * Manages the overall application state and layout
 */
function App() {
  const { theme, language } = useSettingsStore();
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync language
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Filter articles based on search
  useEffect(() => {
    const articles = articleService.searchArticles(searchQuery, language);
    setFilteredArticles(articles);
  }, [searchQuery, language]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
      {/* Space Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Stars Layer 1 - Small stars */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(100)].map((_, i) => (
            <div
              key={`star-small-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 2 + 's',
              }}
            />
          ))}
        </div>
        
        {/* Stars Layer 2 - Medium stars */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-medium-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 2 + 'px',
                height: Math.random() * 3 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                backgroundColor: theme === 'dark' ? '#ffffff' : '#f59e0b',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
              }}
            />
          ))}
        </div>
        
        {/* Stars Layer 3 - Large stars */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={`star-large-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                width: Math.random() * 4 + 3 + 'px',
                height: Math.random() * 4 + 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                backgroundColor: theme === 'dark' ? '#ffffff' : '#eab308',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 4 + 3 + 's',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Header with Search */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content */}
      <main className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Bookshelf with Horizontal Scrolling */}
          <Bookshelf
            articles={filteredArticles}
            onBookSelect={setSelectedArticle}
            selectedArticle={selectedArticle}
          />
        </div>
      </main>

      {/* Article Viewer Modal */}
      {selectedArticle && (
        <ArticleViewer
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

export default App;
