import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '@models/Article';
import { articleService } from '@services/ArticleService';
import { useSettingsStore } from '@stores/settingsStore';
import { Header } from '@components/Header/Header';
import { SearchBar } from '@components/SearchBar/SearchBar';
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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* 3D Bookshelf */}
          <Bookshelf
            articles={filteredArticles}
            onBookSelect={setSelectedArticle}
            selectedArticle={selectedArticle}
          />

          {/* Statistics Info */}
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            </p>
          </div>
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
