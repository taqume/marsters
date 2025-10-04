import React from 'react';
import { Article } from '@models/Article';
import { Book } from '../Book/Book';
import { motion } from 'framer-motion';

interface BookshelfProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
  selectedArticle: Article | null;
}

/**
 * NASA Space-Themed Bookshelf Component
 * Space station shelf system with holographic effects
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
        {/* Shelves - Space Station Modules */}
        <div className="space-y-20">
          {shelves.map((shelfBooks, shelfIndex) => (
            <div key={shelfIndex} className="shelf-container relative">
              {/* Space Station Shelf Board - Clean Glassmorphism */}
              <div className="shelf-board absolute bottom-0 left-0 right-0 h-4 backdrop-blur-md bg-gradient-to-b from-blue-300/20 via-blue-400/15 to-blue-500/20 dark:from-blue-700/25 dark:via-blue-800/20 dark:to-blue-900/25 rounded-lg shadow-xl border-t border-blue-200/40 dark:border-blue-400/30">
                {/* Glossy top edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-blue-300/50 to-transparent" />
                
                {/* Bottom depth */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-b from-transparent to-blue-500/30 dark:to-blue-400/20 rounded-b-lg" />
              </div>

              {/* Books Container */}
              <div className="books-row pb-6 mb-4">
                <div className="flex items-end justify-center space-x-7 px-6 pb-4">
                  {shelfBooks.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 50, rotateY: -30 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.2 }
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
            </div>
          ))}
        </div>

        {/* Empty State - Space Explorer */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping" />
              <div className="text-6xl relative z-10">�</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No mission files found
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-mono text-sm">
              Adjust scanner parameters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
