import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '@models/Article';
import { articleService } from '@services/ArticleService';
import { useSettingsStore } from '@stores/settingsStore';
import { Header } from '@components/Header/Header';
import { Bookshelf } from '@components/Bookshelf/Bookshelf';
import { BookReader } from '@components/BookReader/BookReader';
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
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, language]);

  // Get paginated articles
  const paginatedData = articleService.getPaginatedArticles(filteredArticles, currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black transition-colors relative overflow-hidden">
      {/* Realistic Space Background */}
      <div className="fixed inset-0 pointer-events-none">
        
        {/* ===== DISTANT NEBULA LAYER ===== */}
        <div className="absolute inset-0 opacity-5 dark:opacity-15">
          {/* Large spiral galaxy */}
          <div 
            className="absolute"
            style={{
              width: '500px',
              height: '500px',
              top: '15%',
              right: '10%',
              background: theme === 'dark'
                ? 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(139, 92, 246, 0.1) 60%, transparent 100%)'
                : 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 100%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'spiral-rotate 180s linear infinite',
            }}
          />
          
          {/* Colorful nebula clouds */}
          {[
            { color: theme === 'dark' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(251, 191, 36, 0.3)', top: '60%', left: '15%', size: '400px' },
            { color: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.2)', top: '25%', left: '70%', size: '350px' },
            { color: theme === 'dark' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(251, 146, 60, 0.2)', top: '75%', left: '80%', size: '300px' },
          ].map((nebula, i) => (
            <div
              key={`nebula-${i}`}
              className="absolute rounded-full"
              style={{
                width: nebula.size,
                height: nebula.size,
                top: nebula.top,
                left: nebula.left,
                background: `radial-gradient(circle, ${nebula.color}, transparent)`,
                filter: 'blur(60px)',
                animation: `float ${120 + i * 30}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* ===== FAR STARS LAYER (Distant, slow twinkle) ===== */}
        <div className="absolute inset-0 opacity-40 dark:opacity-50">
          {[...Array(80)].map((_, i) => {
            const size = Math.random() * 1.5 + 0.5;
            const twinkleDuration = Math.random() * 6 + 8;
            const delay = Math.random() * 10;
            // Sabit pozisyonlar için seed bazlı hesaplama
            const topPos = (i * 13.7) % 100;
            const leftPos = (i * 17.3) % 100;
            return (
              <div
                key={`star-far-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  top: topPos + '%',
                  left: leftPos + '%',
                  backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
                  boxShadow: theme === 'dark' 
                    ? '0 0 2px rgba(255, 255, 255, 0.5)' 
                    : '0 0 2px rgba(251, 191, 36, 0.6)',
                  animation: `twinkle-slow ${twinkleDuration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>

        {/* ===== MID STARS LAYER (Medium distance, medium twinkle) ===== */}
        <div className="absolute inset-0 opacity-60 dark:opacity-70">
          {[...Array(60)].map((_, i) => {
            const size = Math.random() * 2.5 + 1;
            const twinkleDuration = Math.random() * 4 + 4;
            const delay = Math.random() * 8;
            const topPos = (i * 19.1) % 100;
            const leftPos = (i * 23.7) % 100;
            return (
              <div
                key={`star-mid-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  top: topPos + '%',
                  left: leftPos + '%',
                  backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
                  boxShadow: theme === 'dark' 
                    ? '0 0 4px rgba(255, 255, 255, 0.7)' 
                    : '0 0 4px rgba(251, 191, 36, 0.8)',
                  animation: `twinkle ${twinkleDuration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>

        {/* ===== NEAR STARS LAYER (Close, fast twinkle, bright) ===== */}
        <div className="absolute inset-0 opacity-80 dark:opacity-90">
          {[...Array(40)].map((_, i) => {
            const size = Math.random() * 3 + 2;
            const twinkleDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            const topPos = (i * 29.3) % 100;
            const leftPos = (i * 31.7) % 100;
            return (
              <div
                key={`star-near-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  top: topPos + '%',
                  left: leftPos + '%',
                  backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
                  boxShadow: theme === 'dark' 
                    ? '0 0 8px rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 0.6)' 
                    : '0 0 8px rgba(251, 191, 36, 1), 0 0 12px rgba(251, 191, 36, 0.7)',
                  animation: `twinkle ${twinkleDuration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>

        {/* ===== PLANETS LAYER ===== */}
        <div className="absolute inset-0">
          {/* Large planet - Bottom left */}
          <div
            className="absolute"
            style={{
              width: '180px',
              height: '180px',
              bottom: '5%',
              left: '-5%',
              borderRadius: '50%',
              background: theme === 'dark'
                ? 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.85), rgba(245, 158, 11, 0.95), rgba(217, 119, 6, 1))'
                : 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.9), rgba(245, 158, 11, 0.95), rgba(217, 119, 6, 1))',
              boxShadow: theme === 'dark'
                ? 'inset -20px -20px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(251, 191, 36, 0.4)'
                : 'inset -20px -20px 40px rgba(0, 0, 0, 0.3), 0 0 50px rgba(251, 191, 36, 0.5)',
              animation: 'planet-wave 45s ease-in-out infinite',
              filter: 'blur(0.8px)',
            }}
          />

          {/* Medium planet - Top right */}
          <div
            className="absolute"
            style={{
              width: '120px',
              height: '120px',
              top: '8%',
              right: '3%',
              borderRadius: '50%',
              background: theme === 'dark'
                ? 'radial-gradient(circle at 35% 35%, rgba(139, 92, 246, 0.85), rgba(124, 58, 237, 0.95), rgba(109, 40, 217, 1))'
                : 'radial-gradient(circle at 35% 35%, rgba(245, 158, 11, 0.85), rgba(251, 146, 60, 0.95), rgba(249, 115, 22, 1))',
              boxShadow: theme === 'dark'
                ? 'inset -15px -15px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)'
                : 'inset -15px -15px 30px rgba(0, 0, 0, 0.3), 0 0 35px rgba(245, 158, 11, 0.5)',
              animation: 'planet-drift 38s ease-in-out infinite',
              filter: 'blur(0.5px)',
            }}
          >
            {/* Ring system */}
            <div
              className="absolute"
              style={{
                width: '180px',
                height: '40px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotateX(75deg)',
                borderRadius: '50%',
                border: theme === 'dark' ? '3px solid rgba(139, 92, 246, 0.7)' : '3px solid rgba(245, 158, 11, 0.7)',
                boxShadow: theme === 'dark'
                  ? '0 0 15px rgba(139, 92, 246, 0.6), inset 0 0 15px rgba(139, 92, 246, 0.4)'
                  : '0 0 15px rgba(245, 158, 11, 0.6), inset 0 0 15px rgba(245, 158, 11, 0.4)',
              }}
            />
          </div>

          {/* Small moon - Orbiting */}
          <div
            className="absolute"
            style={{
              width: '40px',
              height: '40px',
              top: '40%',
              left: '50%',
              animation: 'orbit 50s linear infinite',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: theme === 'dark'
                  ? 'radial-gradient(circle at 40% 40%, rgba(226, 232, 240, 0.9), rgba(148, 163, 184, 1))'
                  : 'radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.85), rgba(245, 158, 11, 1))',
                boxShadow: theme === 'dark'
                  ? 'inset -8px -8px 15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(226, 232, 240, 0.4)'
                  : 'inset -8px -8px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(251, 191, 36, 0.4)',
              }}
            />
          </div>
        </div>

        {/* ===== METEORS LAYER ===== */}
        {/* Large meteors (rare, slow, bright) */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`meteor-large-${i}`}
            className="absolute"
            style={{
              width: '3px',
              height: '3px',
              top: Math.random() * 40 + '%',
              left: Math.random() * 100 + '%',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
              boxShadow: theme === 'dark'
                ? '0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #60a5fa'
                : '0 0 10px #fbbf24, 0 0 20px #f59e0b, 0 0 30px #f97316',
              animation: `meteor-large ${Math.random() * 3 + 6}s linear ${Math.random() * 25 + i * 12}s infinite`,
              opacity: 0,
            }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: '120px',
                height: '2px',
                background: theme === 'dark'
                  ? 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(96, 165, 250, 0.4), transparent)'
                  : 'linear-gradient(to right, rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.4), transparent)',
                filter: 'blur(1px)',
              }}
            />
          </div>
        ))}

        {/* Medium meteors (common, fast) */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`meteor-medium-${i}`}
            className="absolute"
            style={{
              width: '2px',
              height: '2px',
              top: Math.random() * 50 + '%',
              left: Math.random() * 100 + '%',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
              boxShadow: theme === 'dark'
                ? '0 0 6px #ffffff, 0 0 12px #60a5fa'
                : '0 0 6px #fbbf24, 0 0 12px #f59e0b',
              animation: `meteor-medium ${Math.random() * 2 + 3}s linear ${Math.random() * 15 + i * 5}s infinite`,
              opacity: 0,
            }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: '60px',
                height: '1.5px',
                background: theme === 'dark'
                  ? 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(96, 165, 250, 0.3), transparent)'
                  : 'linear-gradient(to right, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.3), transparent)',
                filter: 'blur(0.5px)',
              }}
            />
          </div>
        ))}

        {/* Small fast meteors */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`meteor-small-${i}`}
            className="absolute"
            style={{
              width: '1.5px',
              height: '1.5px',
              top: Math.random() * 60 + '%',
              left: Math.random() * 100 + '%',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#ffffff' : '#fbbf24',
              boxShadow: theme === 'dark'
                ? '0 0 4px #ffffff'
                : '0 0 4px #fbbf24',
              animation: `meteor-small ${Math.random() * 1.5 + 2}s linear ${Math.random() * 10 + i * 4}s infinite`,
              opacity: 0,
            }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: '30px',
                height: '1px',
                background: theme === 'dark'
                  ? 'linear-gradient(to right, rgba(255, 255, 255, 0.7), transparent)'
                  : 'linear-gradient(to right, rgba(251, 191, 36, 0.7), transparent)',
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Header with Search */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content */}
      <main className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Bookshelf with Pagination */}
          <Bookshelf
            articles={paginatedData.articles}
            onBookSelect={setSelectedArticle}
            selectedArticle={selectedArticle}
            currentPage={paginatedData.currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {/* Book Reader Modal */}
      {selectedArticle && (
        <BookReader
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

export default App;
