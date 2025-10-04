import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, HeartOff, ExternalLink } from 'lucide-react';
import { Article, DifficultyLevel, Language } from '@models/Article';
import { articleService } from '@services/ArticleService';
import { useSettingsStore } from '@stores/settingsStore';
import { useFavoritesStore } from '@stores/favoritesStore';
import { useReadingHistoryStore } from '@stores/readingHistoryStore';
import { useReadingTimer } from '@hooks/useReadingTimer';

interface ArticleViewerProps {
  article: Article;
  onClose: () => void;
}

/**
 * Article Viewer Component
 * Displays full article with difficulty level selection
 */
export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onClose }) => {
  const { t } = useTranslation();
  const { language } = useSettingsStore();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { startReading } = useReadingHistoryStore();
  
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
  const isReading = true;

  // Track reading time
  useReadingTimer(article.id, isReading);

  useEffect(() => {
    startReading(article.id, selectedLevel);
  }, [article.id, selectedLevel, startReading]);

  const handleFavoriteToggle = () => {
    if (isFavorite(article.id)) {
      removeFavorite(article.id);
    } else {
      addFavorite(article.id);
    }
  };

  const content = articleService.getLocalizedContent(article, language, selectedLevel);
  const title = articleService.getLocalizedTitle(article, language);
  const displayAuthor = language === Language.TR && article.translations?.tr
    ? article.translations.tr.author
    : article.author;
  const displayCategory = language === Language.TR && article.translations?.tr
    ? article.translations.tr.category
    : article.category;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border p-6 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t('article.backToLibrary')}</span>
            </button>

            <div className="flex items-center space-x-4">
              {/* Difficulty Selector */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel)}
                className="px-4 py-2 bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={DifficultyLevel.BEGINNER}>{t('difficulty.beginner')}</option>
                <option value={DifficultyLevel.INTERMEDIATE}>{t('difficulty.intermediate')}</option>
                <option value={DifficultyLevel.ADVANCED}>{t('difficulty.advanced')}</option>
              </select>

              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                aria-label="Toggle favorite"
              >
                {isFavorite(article.id) ? (
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                ) : (
                  <HeartOff className="w-6 h-6 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Article Metadata */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span><strong>{t('article.author')}:</strong> {displayAuthor}</span>
                <span><strong>{t('article.date')}:</strong> {article.date}</span>
                <span><strong>{t('article.category')}:</strong> {displayCategory}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {content}
              </p>
            </div>

            {/* Original Article Link */}
            <div className="mt-8 flex justify-end">
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <span className="font-medium">{t('article.original')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
