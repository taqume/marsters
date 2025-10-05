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
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [pageDirection, setPageDirection] = useState<'next' | 'prev' | null>(null);
  const isReading = true;

  // Track reading time
  useReadingTimer(article.id, isReading);

  useEffect(() => {
    startReading(article.id, selectedLevel);
  }, [article.id, selectedLevel, startReading]);

  // Get content and split into pages
  const content = articleService.getLocalizedContent(article, language, selectedLevel);
  const title = articleService.getLocalizedTitle(article, language);
  
  // Split content into pages (approximately 300 words per page for better readability)
  const wordsPerPage = 300;
  const words = content.split(' ');
  const totalPages = Math.ceil(words.length / wordsPerPage);
  
  const currentPageContent = useMemo(() => {
    const startIndex = (currentPage - 1) * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    return words.slice(startIndex, endIndex).join(' ');
  }, [content, currentPage, wordsPerPage]);

  // Split current page content into left and right page content
  // Only split if content is long enough for two pages
  const leftPageContent = useMemo(() => {
    const pageWords = currentPageContent.split(' ');
    // If content is short (less than 150 words), show all on left page
    if (pageWords.length < 150) {
      return currentPageContent;
    }
    const midPoint = Math.floor(pageWords.length / 2);
    return pageWords.slice(0, midPoint).join(' ');
  }, [currentPageContent]);

  const rightPageContent = useMemo(() => {
    const pageWords = currentPageContent.split(' ');
    // If content is short (less than 150 words), show nothing on right page
    if (pageWords.length < 150) {
      return '';
    }
    const midPoint = Math.floor(pageWords.length / 2);
    return pageWords.slice(midPoint).join(' ');
  }, [currentPageContent]);

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

  const handlePreviousPage = async () => {
    if (currentPage > 1 && !isPageTurning) {
      setPageDirection('prev');
      setIsPageTurning(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setCurrentPage(currentPage - 1);
      setIsPageTurning(false);
      setPageDirection(null);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages && !isPageTurning) {
      setPageDirection('next');
      setIsPageTurning(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setCurrentPage(currentPage + 1);
      setIsPageTurning(false);
      setPageDirection(null);
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
    [DifficultyLevel.ADVANCED]: 'from-purple-500 to-pink-500',
  };

  const levelIcons = {
    [DifficultyLevel.BEGINNER]: '🌱',
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
        initial={{ 
          scale: 0.3, 
          opacity: 0, 
          rotateY: -180,
          x: '100%',
          filter: 'blur(10px)'
        }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          x: 0,
          filter: 'blur(0px)'
        }}
        exit={{ 
          scale: 0.3, 
          opacity: 0, 
          rotateY: 180,
          x: '100%',
          filter: 'blur(10px)'
        }}
        transition={{ 
          type: 'spring', 
          damping: 20, 
          stiffness: 200,
          duration: 0.8
        }}
        className="fixed inset-4 z-50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Compact Book Header */}
        <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 border-b-2 border-amber-300 dark:border-gray-600 p-3">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 transition-all hover:rotate-90 duration-300 shadow-lg"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Compact Title Row */}
          <div className="flex items-center justify-between pr-12">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
              >
                <Book className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                  {title}
                </h1>
                <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{displayAuthor}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </span>
                  <span 
                    className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: article.coverColor }}
            >
              {displayCategory}
                  </span>
            </div>
          </div>
            </div>

            </div>
          </div>

        {/* Compact Difficulty Selector */}
        <motion.div 
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-amber-200 dark:border-gray-600 p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            {/* Difficulty Selector */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Seviye:</span>
              <div className="flex space-x-1">
                {[DifficultyLevel.BEGINNER, DifficultyLevel.ADVANCED].map((level, index) => (
                  <motion.button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300
                      ${selectedLevel === level
                        ? `bg-gradient-to-r ${levelColors[level]} text-white shadow-md scale-105`
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-gray-600 shadow-sm'
                      }
                    `}
                  >
                    <span className="mr-1">{levelIcons[level]}</span>
                    {t(`difficulty.${level}`)}
                  </motion.button>
                ))}
              </div>
            </motion.div>

              {/* Favorite Button */}
            <motion.button
                onClick={handleFavoriteToggle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group p-2 rounded-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 hover:from-pink-200 hover:to-red-200 dark:hover:from-pink-800/40 dark:hover:to-red-800/40 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Toggle favorite"
              >
                {isFavorite(article.id) ? (
                <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                ) : (
                <HeartOff className="w-4 h-4 text-gray-500 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                )}
            </motion.button>
          </div>
        </motion.div>

        {/* Book Pages Area */}
        <motion.div 
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
            {/* Left Page */}
            <motion.div 
              className="relative p-8 bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-gray-700/50 border-r border-amber-300 dark:border-gray-600 overflow-y-auto"
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                rotateY: pageDirection === 'next' ? -25 : pageDirection === 'prev' ? 0 : 0
              }}
              transition={{ 
                delay: 1.2, 
                type: 'spring', 
                stiffness: 200,
                duration: pageDirection ? 0.6 : 0.8
              }}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fef7ed 50%, #fef3c7 100%)',
                boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Book Spine Shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-amber-200/30 dark:to-gray-600/30" />
              
              <div className="max-w-lg mx-auto">
                {/* Page Content */}
                <motion.div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  key={`left-${currentPage}`}
                  initial={{ 
                    opacity: pageDirection ? 0 : 1, 
                    x: pageDirection === 'next' ? -100 : pageDirection === 'prev' ? 100 : 0,
                    rotateY: pageDirection === 'next' ? -15 : pageDirection === 'prev' ? 15 : 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: 0
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 25,
                    duration: pageDirection ? 0.8 : 0.6
                  }}
                >
                  <p className="text-base leading-relaxed whitespace-pre-wrap font-serif" style={{ color: 'black' }}>
                    {leftPageContent}
                  </p>
                </motion.div>
                
                {/* Page Controls - Left */}
                {totalPages > 1 && (
                  <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                    <motion.button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1 || isPageTurning}
                      whileHover={currentPage > 1 && !isPageTurning ? { scale: 1.1, x: 5 } : {}}
                      whileTap={currentPage > 1 && !isPageTurning ? { scale: 0.9 } : {}}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        currentPage === 1 || isPageTurning
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl'
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className={`w-5 h-5 ${isPageTurning && pageDirection === 'prev' ? 'animate-pulse' : ''}`} />
                    </motion.button>
                  </div>
                )}
                
                {/* Page Number */}
                <div className="absolute bottom-4 left-8 text-sm text-gray-700 dark:text-gray-300 font-serif">
                  {currentPage * 2 - 1}
                </div>
              </div>
            </motion.div>

            {/* Right Page */}
            <motion.div 
              className="relative p-8 bg-gradient-to-br from-amber-50/50 to-white dark:from-gray-700/50 dark:to-gray-800 overflow-y-auto"
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                rotateY: pageDirection === 'prev' ? 25 : pageDirection === 'next' ? 0 : 0
              }}
              transition={{ 
                delay: 1.3, 
                type: 'spring', 
                stiffness: 200,
                duration: pageDirection ? 0.6 : 0.8
              }}
              style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fef7ed 50%, #ffffff 100%)',
                boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Book Spine Shadow */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-transparent to-amber-200/30 dark:to-gray-600/30" />
              
              <div className="max-w-lg mx-auto">
                {/* Page Content */}
                <motion.div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  key={`right-${currentPage}`}
                  initial={{ 
                    opacity: pageDirection ? 0 : 1, 
                    x: pageDirection === 'prev' ? -100 : pageDirection === 'next' ? 100 : 0,
                    rotateY: pageDirection === 'prev' ? -15 : pageDirection === 'next' ? 15 : 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: 0
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 25,
                    duration: pageDirection ? 0.8 : 0.6
                  }}
                >
                  {/* Main Content */}
                  {rightPageContent ? (
                    <p className="text-base leading-relaxed whitespace-pre-wrap font-serif" style={{ color: 'black' }}>
                      {rightPageContent}
                    </p>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-gray-400 dark:text-gray-500 text-sm font-serif italic">
                        Bu sayfa için içerik bulunmuyor
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {/* Page Controls - Right */}
                {totalPages > 1 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <motion.button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages || isPageTurning}
                      whileHover={currentPage < totalPages && !isPageTurning ? { scale: 1.1, x: -5 } : {}}
                      whileTap={currentPage < totalPages && !isPageTurning ? { scale: 0.9 } : {}}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        currentPage === totalPages || isPageTurning
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600 shadow-lg hover:shadow-xl'
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight className={`w-5 h-5 ${isPageTurning && pageDirection === 'next' ? 'animate-pulse' : ''}`} />
                    </motion.button>
                  </div>
                )}
                
                {/* Page Number */}
                <div className="absolute bottom-4 right-8 text-sm text-gray-700 dark:text-gray-300 font-serif">
                  {currentPage * 2}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
