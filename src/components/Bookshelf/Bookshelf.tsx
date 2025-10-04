import React from 'react';
import { Article } from '@models/Article';
import { Book } from '../Book/Book';

interface BookshelfProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
  selectedArticle: Article | null;
}

/**
 * Modern Bookshelf Component with Enhanced Visual Design
 * Features: Gradient backgrounds, ambient lighting, depth effects
 */
export const Bookshelf: React.FC<BookshelfProps> = ({ 
  articles, 
  onBookSelect,
}) => {
  // Group books into shelves (8 books per shelf)
  const booksPerShelf = 8;
  const shelves: Article[][] = [];
  
  for (let i = 0; i < articles.length; i += booksPerShelf) {
    shelves.push(articles.slice(i, i + booksPerShelf));
  }

  return (
    <div className="w-full min-h-[700px] relative">
      {/* Content Container */}
      <div className="relative z-10 py-10 px-6">
        {/* Shelves */}
        <div className="space-y-20">
          {shelves.map((shelfBooks, shelfIndex) => (
            <div key={shelfIndex} className="shelf-container relative">
              {/* Modern Shelf Board */}
              <div className="shelf-board absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-lg shadow-2xl">
                {/* Glass effect on top */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                
                {/* Metallic shimmer */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 60%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s infinite',
                  }}
                />

                {/* Depth shadow */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-b from-transparent to-black/30 rounded-b-lg" />
              </div>

              {/* Books Container */}
              <div className="books-row pb-6 mb-4">
                <div className="flex items-end justify-center space-x-7 px-6 pb-4">
                  {shelfBooks.map((article, index) => (
                    <div
                      key={article.id}
                      className="animate-fade-in"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both',
                      }}
                    >
                      <Book
                        article={article}
                        onClick={() => onBookSelect(article)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <div className="text-6xl">📚</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
