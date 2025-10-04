import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ExternalLink, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Article, DifficultyLevel } from '@models/Article';
import { articleService } from '@services/ArticleService';
import { useSettingsStore } from '@stores/settingsStore';
import { useFavoritesStore } from '@stores/favoritesStore';
import { useReadingHistoryStore } from '@stores/readingHistoryStore';
import { useReadingTimer } from '@hooks/useReadingTimer';

interface BookReaderProps {
  article: Article;
  onClose: () => void;
  initialPosition?: { x: number; y: number; width: number; height: number };
}

/**
 * Advanced Book Reader with 3D Opening Animation
 * Features: Book opening/closing animations, page flipping, realistic 3D effects
 */
export const BookReader: React.FC<BookReaderProps> = ({ 
  article, 
  onClose,
  initialPosition 
}) => {
  const { t } = useTranslation();
  const { language } = useSettingsStore();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { startReading } = useReadingHistoryStore();
  
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DifficultyLevel.BEGINNER);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(true);
  const [isAnimatingClose, setIsAnimatingClose] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  
  const bookRef = useRef<HTMLDivElement>(null);
  const isReading = !isAnimatingOpen && !isAnimatingClose;

  // Track reading time
  useReadingTimer(article.id, isReading);

  useEffect(() => {
    if (isReading) {
      startReading(article.id, selectedLevel);
    }
  }, [article.id, selectedLevel, startReading, isReading]);

  // Get localized content
  const title = articleService.getLocalizedTitle(article, language);
  const author = language === 'tr' && article.translations?.tr
    ? article.translations.tr.author
    : article.author;
  const category = language === 'tr' && article.translations?.tr
    ? article.translations.tr.category
    : article.category;
  const content = articleService.getLocalizedContent(article, language, selectedLevel);
  
  // Get summary for the info page (left page on first opening)
  const summary = article.summary 
    ? (language === 'tr' && article.translations?.tr?.summary 
        ? article.translations.tr.summary[selectedLevel]
        : article.summary[selectedLevel])
    : content.substring(0, 500) + '...'; // Fallback to first 500 chars

  // Split content into pages (approximately 600 characters per page)
  const charsPerPage = 600;
  const totalPages = Math.ceil(content.length / charsPerPage);
  
  const getPageContent = (pageNum: number) => {
    const startIndex = (pageNum - 1) * charsPerPage;
    const endIndex = startIndex + charsPerPage;
    return content.substring(startIndex, endIndex);
  };

  // Calculate reading progress
  useEffect(() => {
    const progress = (currentPage / totalPages) * 100;
    setReadingProgress(Math.round(progress));
  }, [currentPage, totalPages]);

  // Reset to first page when level changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel]);

  // Handle opening animation completion
  useEffect(() => {
    if (isAnimatingOpen) {
      const timer = setTimeout(() => {
        setIsAnimatingOpen(false);
      }, 1000); // 1 second animation
      return () => clearTimeout(timer);
    }
  }, [isAnimatingOpen]);

  const handleClose = () => {
    setIsAnimatingClose(true);
    setTimeout(() => {
      onClose();
    }, 1000); // Wait for closing animation
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setCurrentPage(currentPage + 1);
      setIsFlipping(false);
      setFlipDirection(null);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setCurrentPage(currentPage - 1);
      setIsFlipping(false);
      setFlipDirection(null);
    }
  };

  const handlePageInput = (page: number) => {
    if (page >= 1 && page <= totalPages && !isFlipping) {
      setCurrentPage(page);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite(article.id)) {
      removeFavorite(article.id);
    } else {
      addFavorite(article.id);
    }
  };

  const leftPageContent = currentPage === 1 ? summary : getPageContent(currentPage - 1);
  const rightPageContent = getPageContent(currentPage);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        onClick={handleClose}
      >
        {/* Controls Container - Centered with Fixed Width */}
        <div className="relative w-[1000px] h-[600px]">
          {/* Difficulty Selector - Top Center */}
          <motion.div
            className="absolute -top-14 left-0 right-0 mx-auto w-fit flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-neutral-800 dark:to-neutral-900 border-2 border-amber-800/30 dark:border-neutral-600 rounded-lg shadow-lg p-1 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedLevel(DifficultyLevel.BEGINNER); }}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                selectedLevel === DifficultyLevel.BEGINNER
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-amber-200 dark:hover:bg-neutral-700'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedLevel(DifficultyLevel.INTERMEDIATE); }}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                selectedLevel === DifficultyLevel.INTERMEDIATE
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-amber-200 dark:hover:bg-neutral-700'
              }`}
            >
              Intermediate
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedLevel(DifficultyLevel.ADVANCED); }}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                selectedLevel === DifficultyLevel.ADVANCED
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-amber-200 dark:hover:bg-neutral-700'
              }`}
            >
              Advanced
            </button>
          </motion.div>

          {/* Vertical Progress Bar - Left Side */}
          <motion.div
            className="absolute top-0 -left-[15px] flex flex-col items-center gap-2 h-[600px] z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              {readingProgress}%
            </span>
            <div className="w-2 flex-1 bg-amber-200/50 dark:bg-neutral-700/50 rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 via-orange-500 to-amber-600 rounded-full shadow-lg"
                initial={{ height: 0 }}
                animate={{ height: `${readingProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Right Side Buttons */}
          <motion.div
            className="absolute top-0 -right-[15px] flex flex-col gap-2 z-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="w-12 h-12 bg-red-500/90 hover:bg-red-600 border-2 border-red-700 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              title="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 bg-blue-500/90 hover:bg-blue-600 border-2 border-blue-700 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                title="Open Original Article"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
              className="w-12 h-12 bg-amber-100 dark:bg-neutral-800 border-2 border-amber-800/30 dark:border-neutral-600 rounded-md shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              title={isFavorite(article.id) ? "Remove from Favorites" : "Add to Favorites"}
            >
              {isFavorite(article.id) ? (
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </motion.div>

          {/* Page Navigation - Bottom Center */}
          <motion.div
            className="absolute -bottom-[53px] left-10 right-3 mx-auto w-fit z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-neutral-800 dark:to-neutral-900 border-2 border-amber-800/30 dark:border-neutral-600 rounded-lg shadow-lg p-1">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevPage(); }}
                disabled={currentPage === 1 || isFlipping}
                className="px-3 py-2 rounded-md hover:bg-amber-200 dark:hover:bg-neutral-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4 text-gray-800 dark:text-amber-100" />
              </button>

              <div className="px-4 py-2 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-800 dark:text-amber-200" />
                <span className="text-xs font-semibold text-gray-800 dark:text-amber-50 min-w-[50px] text-center">
                  {currentPage} / {totalPages}
                </span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleNextPage(); }}
                disabled={currentPage === totalPages || isFlipping}
                className="px-3 py-2 rounded-md hover:bg-amber-200 dark:hover:bg-neutral-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4 text-gray-800 dark:text-amber-100" />
              </button>
            </div>
          </motion.div>

          {/* Main Book Container */}
          <motion.div
            ref={bookRef}
            className="relative"
            style={{ perspective: '3000px' }}
            initial={initialPosition ? {
              x: initialPosition.x - window.innerWidth / 2,
              y: initialPosition.y - window.innerHeight / 2,
              scale: 0.2,
              rotateY: 0,
            } : {
              scale: 0.2,
              rotateY: 0,
            }}
            animate={isAnimatingClose ? (initialPosition ? {
              x: initialPosition.x - window.innerWidth / 2,
              y: initialPosition.y - window.innerHeight / 2,
              scale: 0.2,
              rotateY: 0,
              transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
            } : {
              scale: 0,
              rotateY: 0,
              transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
            }) : {
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Book Itself - Smaller Size */}
          <div className="relative w-[1000px] h-[600px] flex items-center justify-center">
            
            {/* Open Book */}
            <motion.div
              className="relative flex"
              style={{ 
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))'
              }}
              initial={{ rotateX: -90 }}
              animate={isAnimatingClose ? { 
                rotateX: -90,
                transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
              } : { 
                rotateX: 0,
                transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }
              }}
            >
              {/* Book Spine */}
              <div 
                className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 z-20"
                style={{
                  background: 'linear-gradient(to right, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)',
                  boxShadow: 'inset -3px 0 10px rgba(0, 0, 0, 0.8), inset 3px 0 10px rgba(0, 0, 0, 0.8)',
                  transform: 'translateZ(5px)'
                }}
              />

              {/* Left Page */}
              <motion.div
                className="relative w-[460px] h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-900 rounded-l-lg overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'right center',
                  boxShadow: 'inset -5px 0 15px rgba(0, 0, 0, 0.1), -10px 0 30px rgba(0, 0, 0, 0.3)'
                }}
                animate={
                  flipDirection === 'next' 
                    ? {
                        rotateY: [-5, -180],
                        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
                      }
                    : flipDirection === 'prev'
                    ? {
                        rotateY: [-180, -5],
                        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
                      }
                    : { rotateY: -5 }
                }
              >
                {/* Page texture */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\' /%3E%3C/svg%3E")',
                  }}
                />

                <div className="relative h-full p-16 overflow-y-auto custom-scrollbar">
                  {currentPage === 1 ? (
                    // Info Page
                    <div className="space-y-6">
                      <div className="border-b-2 border-amber-800/20 dark:border-amber-200/20 pb-4">
                        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-amber-50 mb-3 leading-tight">
                          {title}
                        </h1>
                        <p className="text-base text-gray-700 dark:text-amber-100 font-medium">
                          {t('book.by')} {author}
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-gray-700 dark:text-amber-100 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{t('book.category')}:</span>
                          <span>{category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{t('book.published')}:</span>
                          <span>{new Date(article.date).toLocaleDateString(language)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{t('book.pages')}:</span>
                          <span>{totalPages}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t-2 border-amber-800/20 dark:border-amber-200/20">
                        <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-amber-50 mb-2">
                          {t('book.summary')}
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-800 dark:text-amber-100 font-serif">
                          {summary}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Content Page
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-sm leading-relaxed text-gray-800 dark:text-amber-100 font-serif whitespace-pre-wrap">
                        {leftPageContent}
                      </p>
                    </div>
                  )}
                  
                  {/* Page Number */}
                  <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 dark:text-amber-200">
                    {currentPage === 1 ? 'i' : (currentPage - 1) * 2}
                  </div>
                </div>
              </motion.div>

              {/* Right Page */}
              <motion.div
                className="relative w-[460px] h-[600px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-900 rounded-r-lg overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  boxShadow: 'inset 5px 0 15px rgba(0, 0, 0, 0.1), 10px 0 30px rgba(0, 0, 0, 0.3)'
                }}
                animate={
                  flipDirection === 'next' 
                    ? {
                        rotateY: [5, 180],
                        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
                      }
                    : flipDirection === 'prev'
                    ? {
                        rotateY: [180, 5],
                        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
                      }
                    : { rotateY: 5 }
                }
              >
                {/* Page texture */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\' /%3E%3C/svg%3E")',
                  }}
                />

                <div className="relative h-full p-16 overflow-y-auto custom-scrollbar">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-sm leading-relaxed text-gray-800 dark:text-amber-100 font-serif whitespace-pre-wrap">
                      {rightPageContent}
                    </p>
                  </div>
                  
                  {/* Page Number */}
                  <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-500 dark:text-amber-200">
                    {currentPage * 2 + 1}
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
