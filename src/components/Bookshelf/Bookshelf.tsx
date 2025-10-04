import React from 'react';
import { Article } from '@models/Article';
import { Book } from '../Book/Book';

interface BookshelfProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
  selectedArticle: Article | null;
}

/**
 * Bookshelf Component with Horizontal Scrolling Shelves
 * Displays articles as realistic books on scrollable shelves
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
    <div className="w-full min-h-[600px] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="py-8 px-4 space-y-12">
        {shelves.map((shelfBooks, shelfIndex) => (
          <div key={shelfIndex} className="shelf-container relative">
            {/* Shelf Background Bar (Modern blue-gray) */}
            <div className="shelf-board absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-sm shadow-lg">
              {/* Metallic shine effect */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              }} />
              {/* Shelf edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-slate-400" />
            </div>

            {/* Books Container - NO horizontal scroll, fixed grid */}
            <div className="books-row pb-4 mb-3">
              <div className="flex items-end justify-center space-x-4 px-4 pb-2">
                {shelfBooks.map((article) => (
                  <Book
                    key={article.id}
                    article={article}
                    onClick={() => onBookSelect(article)}
                  />
                ))}
              </div>
            </div>

            {/* Shelf Support (Side brackets) */}
            <div className="absolute bottom-0 left-2 w-1 h-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full shadow-md" />
            <div className="absolute bottom-0 right-2 w-1 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full shadow-md" />
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="text-center pb-6 text-gray-600 dark:text-gray-400 text-sm">
        {articles.length > 0 ? (
          <p>Showing {articles.length} articles on {shelves.length} {shelves.length === 1 ? 'shelf' : 'shelves'}</p>
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};
