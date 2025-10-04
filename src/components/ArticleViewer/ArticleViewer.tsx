import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, HeartOff, ExternalLink, BookOpen, Clock, User, Calendar, Sparkles, ChevronLeft, ChevronRight, Book } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isReading = true;

  // Track reading time
  useReadingTimer(article.id, isReading);

  useEffect(() => {
    startReading(article.id, selectedLevel);
  }, [article.id, selectedLevel, startReading]);

  // Get content and split into pages
  const content = articleService.getLocalizedContent(article, language, selectedLevel);
  const title = articleService.getLocalizedTitle(article, language);
  
  // Split content into pages (approximately 500 words per page)
  const wordsPerPage = 500;
  const words = content.split(' ');
  const totalPages = Math.ceil(words.length / wordsPerPage);
  
  const currentPageContent = useMemo(() => {
    const startIndex = (currentPage - 1) * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    return words.slice(startIndex, endIndex).join(' ');
  }, [content, currentPage, wordsPerPage]);

  // Reset to first page when level changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel]);

  // Calculate scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(article.id)) {
      removeFavorite(article.id);
    } else {
      addFavorite(article.id);
    }
  };

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
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Encyclopedia Book */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-4 z-50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Encyclopedia Header */}
        <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 border-b-2 border-amber-300 dark:border-gray-600 p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 transition-all hover:rotate-90 duration-300 shadow-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Encyclopedia Title */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  Bilim Ansiklopedisi
                </h1>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {displayCategory}
                </div>
              </div>
            </div>
          </div>

          {/* Article Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4 leading-tight">
            {title}
          </h2>

          {/* Article Metadata */}
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{displayAuthor}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(words.length / 200)} dk okuma</span>
            </div>
          </div>

          {/* Page Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl'
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sayfa {currentPage} / {totalPages}
                </span>
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl'
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Difficulty Selector & Actions */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-amber-200 dark:border-gray-600 p-4">
          <div className="flex items-center justify-between">
            {/* Difficulty Selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Zorluk Seviyesi:</span>
              <div className="flex space-x-2">
                {[DifficultyLevel.BEGINNER, DifficultyLevel.INTERMEDIATE, DifficultyLevel.ADVANCED].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`
                      px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300
                      ${selectedLevel === level
                        ? `bg-gradient-to-r ${levelColors[level]} text-white shadow-lg scale-105`
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-gray-600 shadow-md'
                      }
                    `}
                  >
                    <span className="mr-1">{levelIcons[level]}</span>
                    {t(`difficulty.${level}`)}
                  </button>
                ))}
              </div>
            </div>

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

        {/* Encyclopedia Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column */}
            <div className="p-8 bg-gradient-to-br from-white/80 to-amber-50/80 dark:from-gray-800/80 dark:to-gray-700/80 border-r border-amber-200 dark:border-gray-600 overflow-y-auto">
              <div className="max-w-lg mx-auto">
                {/* Column Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-serif">
                    {currentPageContent}
                  </p>
                </div>
                
                {/* Page Indicator for Left Column */}
                {totalPages > 1 && (
                  <div className="mt-8 pt-4 border-t border-amber-200 dark:border-gray-600 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-md">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {currentPage} / {totalPages}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="p-8 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-gray-700/80 dark:to-gray-600/80 overflow-y-auto">
              <div className="max-w-lg mx-auto">
                {/* Column Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Article Info Box */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-200 dark:border-gray-600 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-amber-600" />
                    Makale Bilgileri
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Yazar:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{displayAuthor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tarih:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{article.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Kategori:</span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: article.coverColor }}
                      >
                        {displayCategory}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Kelime Sayısı:</span>
                      <span className="font-medium text-gray-800 dark:text-white">{words.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tahmini Süre:</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {Math.ceil(words.length / 200)} dakika
                      </span>
                    </div>
                  </div>
                </div>

                {/* Difficulty Level Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-200 dark:border-gray-600 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">{levelIcons[selectedLevel]}</span>
                    Zorluk Seviyesi
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedLevel === DifficultyLevel.BEGINNER && "Bu seviye temel bilgileri içerir ve herkesin anlayabileceği şekilde yazılmıştır."}
                    {selectedLevel === DifficultyLevel.INTERMEDIATE && "Orta seviye bilgi gerektiren bu içerik, temel bilimsel kavramları bilenler için uygundur."}
                    {selectedLevel === DifficultyLevel.ADVANCED && "İleri seviye bilimsel terminoloji ve kavramları içeren uzman düzeyinde içerik."}
                  </p>
                </div>

                {/* Original Article Link */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      Orijinal Araştırma
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Tam bilimsel makaleyi keşfedin
                    </p>
                    <a
                      href="https://www.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm"
                    >
                      <span>{t('article.original')}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
