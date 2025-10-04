import React from 'react';
import { Article } from '@models/Article';
import { Book } from '../Book/Book';
import { BookOpen, TrendingUp } from 'lucide-react';

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
      {/* Ambient Background with Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 rounded-3xl overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/30 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(147, 51, 234, 0.03) 20px, rgba(147, 51, 234, 0.03) 40px)
            `,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-10 px-6">
        {/* Stats Header */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Library
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} • {shelves.length} {shelves.length === 1 ? 'shelf' : 'shelves'}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-purple-700/50">
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Recently Updated</span>
          </div>
        </div>

        {/* Shelves */}
        <div className="space-y-16">
          {shelves.map((shelfBooks, shelfIndex) => (
            <div key={shelfIndex} className="shelf-container relative">
              {/* Shelf Label */}
              <div className="absolute -top-6 left-4 z-20">
                <div className="flex items-center space-x-2 px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Shelf {shelfIndex + 1}
                  </span>
                </div>
              </div>

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
              <div className="books-row pb-5 mb-4">
                <div className="flex items-end justify-center space-x-5 px-6 pb-3">
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

              {/* Enhanced Shelf Supports */}
              <div className="absolute bottom-0 left-4 w-2 h-10 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 rounded-full shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
              </div>
              <div className="absolute bottom-0 right-4 w-2 h-10 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 rounded-full shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
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
