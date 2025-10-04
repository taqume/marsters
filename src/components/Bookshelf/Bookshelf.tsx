import React from 'react';
import { Article } from '@models/Article';
import { Book } from '../Book/Book';
import { motion } from 'framer-motion';

interface BookshelfProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
  selectedArticle: Article | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * NASA Space-Themed Bookshelf Component
 * Space station shelf system with holographic effects
 */
export const Bookshelf: React.FC<BookshelfProps> = ({ 
  articles, 
  onBookSelect,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Group books into shelves (6 books per shelf for better spacing)
  const booksPerShelf = 6;
  const shelves: Article[][] = [];
  
  for (let i = 0; i < articles.length; i += booksPerShelf) {
    shelves.push(articles.slice(i, i + booksPerShelf));
  }

  return (
    <div className="w-full min-h-[700px] relative flex justify-center">
      {/* Content Container */}
      <div className="relative z-10 py-10 px-6 max-w-[1300px] w-full">
        {/* Shelves - Space Station Modules */}
        <div className="space-y-24">
          {shelves.map((shelfBooks, shelfIndex) => (
            <div key={shelfIndex} className="shelf-container relative">
              {/* Books Container */}
              <div className="books-row pb-6 mb-4">
                <div className="flex items-end justify-center gap-8 px-6 pb-4">
                  {shelfBooks.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.08,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <Book
                        article={article}
                        onClick={() => onBookSelect(article)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Space Station Shelf Board - Fits book width */}
              <div 
                className="shelf-board absolute bottom-0 left-1/2 -translate-x-1/2 h-4 backdrop-blur-md bg-gradient-to-b from-blue-300/20 via-blue-400/15 to-blue-500/20 dark:from-blue-700/25 dark:via-blue-800/20 dark:to-blue-900/25 rounded-lg shadow-xl border-t border-blue-200/40 dark:border-blue-400/30"
                style={{
                  width: `${shelfBooks.length * 180 + 40}px`,
                }}
              >
                {/* Glossy top edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-blue-300/50 to-transparent" />
                
                {/* Bottom depth */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-b from-transparent to-blue-500/30 dark:to-blue-400/20 rounded-b-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Space Explorer */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping" />
              <div className="text-6xl relative z-10">🔭</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No mission files found
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-mono text-sm">
              Adjust scanner parameters
            </p>
          </div>
        )}

        {/* Pagination Controls - NASA Mission Control Style */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>

            {/* Page Info */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-blue-200 dark:border-blue-700">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Page
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentPage}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                /
              </span>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            >
              <span className="flex items-center gap-2">
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
