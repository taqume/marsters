import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, HeartOff, ExternalLink, BookOpen, Clock, User, Calendar, Sparkles } from 'lucide-react';
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
 * Modern Article Viewer Component with Slide-in Panel Design
 * Features: Reading progress, enhanced typography, glassmorphism
 */
export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onClose }) => {
  const { t } = useTranslation();
  const { language } = useSettingsStore();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { startReading } = useReadingHistoryStore();
  
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isReading = true;

  // Track reading time
  useReadingTimer(article.id, isReading);

  useEffect(() => {
    startReading(article.id, selectedLevel);
  }, [article.id, selectedLevel, startReading]);

  // Calculate scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

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

  const levelColors = {
    [DifficultyLevel.BEGINNER]: 'from-green-500 to-emerald-500',
    [DifficultyLevel.INTERMEDIATE]: 'from-blue-500 to-cyan-500',
    [DifficultyLevel.ADVANCED]: 'from-purple-500 to-pink-500',
  };

  const levelIcons = {
    [DifficultyLevel.BEGINNER]: '🌱',
    [DifficultyLevel.INTERMEDIATE]: '🚀',
    [DifficultyLevel.ADVANCED]: '⚡',
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-10">
          <motion.div
            className={`h-full bg-gradient-to-r ${levelColors[selectedLevel]}`}
            initial={{ width: 0 }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Header with Glassmorphism */}
        <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-purple-200/50 dark:border-purple-800/30 p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:rotate-90 duration-300"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Article Badge */}
          <div className="flex items-center space-x-2 mb-4">
            <div 
              className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ backgroundColor: article.coverColor }}
            >
              {displayCategory}
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
            {title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{displayAuthor}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            {/* Difficulty Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level:</span>
              <div className="flex space-x-2">
                {[DifficultyLevel.BEGINNER, DifficultyLevel.INTERMEDIATE, DifficultyLevel.ADVANCED].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`
                      px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300
                      ${selectedLevel === level
                        ? `bg-gradient-to-r ${levelColors[level]} text-white shadow-lg scale-105`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <span className="mr-1">{levelIcons[level]}</span>
                    {t(`difficulty.${level}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                className="group p-3 rounded-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 hover:from-pink-200 hover:to-red-200 dark:hover:from-pink-800/40 dark:hover:to-red-800/40 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Toggle favorite"
              >
                {isFavorite(article.id) ? (
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                ) : (
                  <HeartOff className="w-5 h-5 text-gray-500 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div 
          className="flex-1 overflow-y-auto px-8 py-8 scroll-smooth"
          onScroll={handleScroll}
        >
          {/* Content Card */}
          <div className="max-w-2xl mx-auto">
            {/* Reading Icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-serif">
                {content}
              </p>
            </div>

            {/* Original Article Link */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Read Original Research
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Explore the full scientific paper
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  <span>{t('article.original')}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Bottom Spacer */}
            <div className="h-20" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
