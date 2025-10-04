import { Article } from '@models/Article';
import { useSettingsStore } from '@stores/settingsStore';
import { articleService } from '@services/ArticleService';
import { BookOpen } from 'lucide-react';

interface BookshelfFallbackProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
}

/**
 * 2D Fallback Bookshelf Component
 * Simple grid view as fallback when 3D is not available
 * Can be used during development or on devices without WebGL support
 */
export const BookshelfFallback: React.FC<BookshelfFallbackProps> = ({ 
  articles, 
  onBookSelect 
}) => {
  const { language } = useSettingsStore();

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {articles.map((article) => {
          const title = articleService.getLocalizedTitle(article, language);
          
          return (
            <button
              key={article.id}
              onClick={() => onBookSelect(article)}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: article.coverColor }}
            >
              {/* Book spine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
              
              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-white">
                <BookOpen className="w-12 h-12 mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-sm font-bold text-center line-clamp-3 px-2">
                  {title}
                </h3>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          );
        })}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No articles found</p>
        </div>
      )}
    </div>
  );
};
