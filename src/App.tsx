import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '@models/Article';
import { articleService } from '@services/ArticleService';
import { useSettingsStore } from '@stores/settingsStore';
import { useFavoritesStore } from '@stores/favoritesStore';
import { Header } from '@components/Header/Header';
import { Bookshelf } from '@components/Bookshelf/Bookshelf';
import { BookReader } from '@components/BookReader/BookReader';
import { AIChatbot } from '@components/AIChatbot/AIChatbot';
import { SpaceBackground } from '@components/SpaceBackground/SpaceBackground';
import './i18n/config';

/**
 * Main App Component
 * Manages the overall application state and layout
 */
function App() {
  const { theme, language } = useSettingsStore();
  const { getFavorites } = useFavoritesStore();
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInContent, setSearchInContent] = useState(false);
  const [searchByAuthor, setSearchByAuthor] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get favorite articles
  const favoriteIds = getFavorites();
  const favoriteArticles = articleService.getArticlesByIds(favoriteIds);

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
    // Update document title based on language
    document.title = i18n.t('header.title');
  }, [language, i18n]);

  // Filter articles based on search
  useEffect(() => {
    let articles: Article[];
    
    if (searchByAuthor) {
      // Search by author
      articles = articleService.searchArticlesByAuthor(searchQuery, language);
    } else if (searchInContent) {
      // Search in content
      articles = articleService.searchArticlesWithContent(searchQuery, language);
    } else {
      // Default: search by title
      articles = articleService.searchArticles(searchQuery, language);
    }
    
    setFilteredArticles(articles);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, language, searchInContent, searchByAuthor]);

  // Get paginated articles
  const paginatedData = articleService.getPaginatedArticles(filteredArticles, currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black transition-colors relative overflow-hidden">
      {/* Realistic Space Background */}
      <SpaceBackground theme={theme} />
      
      {/* Header with Search */}
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        searchInContent={searchInContent}
        onSearchInContentChange={setSearchInContent}
        searchByAuthor={searchByAuthor}
        onSearchByAuthorChange={setSearchByAuthor}
      />

      {/* Main Content */}
      <main className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Bookshelf with Pagination */}
          <Bookshelf
            articles={paginatedData.articles}
            favoriteArticles={favoriteArticles}
            onBookSelect={(article, position) => {
              setSelectedArticle(article);
              setClickPosition(position);
            }}
            selectedArticle={selectedArticle}
            currentPage={paginatedData.currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {/* Book Reader Modal */}
      {selectedArticle && clickPosition && (
        <BookReader
          article={selectedArticle}
          clickPosition={clickPosition}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* AI Chatbot - Always visible */}
      <AIChatbot currentArticle={selectedArticle} />
    </div>
  );
}

export default App;
