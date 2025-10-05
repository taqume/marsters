import { Article } from '@models/Article';
import { motion } from 'framer-motion';
import { useSettingsStore } from '@stores/settingsStore';
import { articleService } from '@services/ArticleService';

interface BookProps {
  article: Article;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Realistic 3D Book Component
 * Features: Thick cover, visible pages, realistic depth, dynamic title sizing
 */
export const Book: React.FC<BookProps> = ({ article, onClick }) => {
  const { language } = useSettingsStore();
  
  // Get localized title
  const localizedTitle = articleService.getLocalizedTitle(article, language);
  
  // Dynamic font size based on title length - BÜYÜTÜLMÜŞ
  const getTitleFontSize = (title: string): string => {
    const length = title.length;
    if (length <= 30) return '20px';      // Kısa başlıklar için daha büyük
    if (length <= 50) return '18px';      // Orta uzunluk
    if (length <= 70) return '16px';      // Uzun başlıklar
    if (length <= 90) return '14px';      // Çok uzun
    return '12px';                         // En uzun başlıklar
  };
  
  // Dynamic line height based on font size
  const getTitleLineHeight = (title: string): string => {
    const length = title.length;
    if (length <= 30) return '1.35';
    if (length <= 50) return '1.3';
    return '1.25';
  };
  return (
    <motion.div
      onClick={onClick}
      className="book-container group cursor-pointer flex-shrink-0 relative"
      style={{
        perspective: '2000px',
        width: '160px',
        height: '240px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20
      }}
      whileHover={{ 
        y: -15,
        transition: { duration: 0.3 }
      }}
    >
      {/* Book Shadow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140px] h-3 bg-black/30 dark:bg-black/50 blur-lg rounded-full transition-all duration-300 group-hover:w-[120px] group-hover:opacity-60"
      />

      <div 
        className="book relative"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-5deg)',
        }}
      >
        {/* Book Cover - Front - Elegant Space Encyclopedia Style */}
        <div
          className="book-cover absolute inset-0 rounded-r-md overflow-hidden"
          style={{
            backgroundColor: '#0d0d15',
            backgroundImage: 'linear-gradient(135deg, #08080c 0%, #0d0d15 50%, #12121d 100%)',
            boxShadow: `
              8px 8px 20px rgba(0, 0, 0, 0.8),
              inset -5px 0 15px rgba(0, 0, 0, 0.5),
              inset 2px 2px 8px rgba(255, 215, 0, 0.08)
            `,
            transform: 'translateZ(15px)',
          }}
        >
          {/* Subtle Deep Space Nebula - Very Soft */}
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              background: `
                radial-gradient(ellipse 800px 600px at 30% 40%, rgba(79, 70, 229, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse 600px 800px at 70% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
              `
            }}
          />

          {/* Minimal Star Field - Fewer, Elegant Stars */}
          <div className="absolute inset-0">
            {/* Carefully placed larger stars */}
            {[
              { top: 15, left: 20, size: 1.5, opacity: 0.6 },
              { top: 35, left: 75, size: 1.2, opacity: 0.5 },
              { top: 58, left: 30, size: 1.3, opacity: 0.55 },
              { top: 78, left: 65, size: 1.4, opacity: 0.6 },
              { top: 25, left: 88, size: 1.1, opacity: 0.5 },
              { top: 68, left: 12, size: 1.2, opacity: 0.52 },
            ].map((star, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  opacity: star.opacity,
                  boxShadow: '0 0 3px rgba(255, 255, 255, 0.6)',
                }}
              />
            ))}
            
            {/* Tiny distant stars - Sparse */}
            {[
              { top: 10, left: 45 }, { top: 22, left: 55 }, { top: 40, left: 85 },
              { top: 50, left: 18 }, { top: 72, left: 82 }, { top: 85, left: 40 },
              { top: 28, left: 12 }, { top: 62, left: 48 }, { top: 82, left: 25 },
            ].map((star, i) => (
              <div
                key={`tiny-star-${i}`}
                className="absolute w-[0.5px] h-[0.5px] rounded-full bg-white"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  opacity: 0.3,
                  boxShadow: '0 0 1px rgba(255, 255, 255, 0.4)',
                }}
              />
            ))}
          </div>

          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content - Clean & Minimalist */}
          <div className="relative h-full flex flex-col justify-between px-4 py-4">
            {/* Title Area - Expanded with more space */}
            <div 
              className="font-serif font-bold pt-2 overflow-hidden"
              style={{ 
                color: '#D4AF37', 
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                fontSize: getTitleFontSize(localizedTitle),
                lineHeight: getTitleLineHeight(localizedTitle),
                height: '175px',  // Daha geniş alan (140px -> 175px)
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <div className="line-clamp-8 w-full">
                {localizedTitle}
              </div>
            </div>
            
            {/* Book ID - Centered at bottom */}
            <div className="flex justify-center pb-2">
              <div 
                className="text-2xl font-serif font-bold tracking-wider" 
                style={{ 
                  color: '#FFD700', 
                  textShadow: '0 2px 6px rgba(212, 175, 55, 0.6), 0 0 10px rgba(255, 215, 0, 0.3)' 
                }}
              >
                {article.id}
              </div>
            </div>
          </div>

          {/* Left shadow (spine shadow) */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-4"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2), transparent)',
            }}
          />

          {/* Highlight on right edge */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))',
            }}
          />
        </div>

        {/* Book Spine (3D side) - Elegant Space Style */}
        <div
          className="book-spine absolute left-0 top-0 bottom-0 rounded-l-md overflow-hidden"
          style={{
            width: '45px',
            backgroundColor: '#0d0d15',
            transform: 'rotateY(-90deg) translateX(-22.5px)',
            transformOrigin: 'right',
            backgroundImage: 'linear-gradient(to right, #000000, #0d0d15, #08080c)',
            boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.8), -5px 0 15px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Very subtle space accent */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
            }}
          />
          
          <div className="h-full flex items-center justify-center px-2 relative z-10">
            <span 
              className="text-[10px] font-serif font-bold text-center"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                color: '#D4AF37',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {localizedTitle.substring(0, 30)}
            </span>
          </div>
        </div>

        {/* Book Pages (realistic stack) */}
        <div
          className="book-pages absolute top-1 bottom-1 right-0"
          style={{
            width: '12px',
            transform: 'translateZ(-1px)',
            background: `
              linear-gradient(to right, 
                #e8e6e1 0%, 
                #f5f3ee 20%, 
                #ffffff 40%,
                #f9f7f2 60%,
                #ece9e4 80%,
                #e0ddd8 100%
              )
            `,
            borderRadius: '0 2px 2px 0',
            boxShadow: `
              inset -3px 0 8px rgba(0, 0, 0, 0.3),
              2px 0 4px rgba(0, 0, 0, 0.2)
            `,
          }}
        >
          {/* Individual page lines */}
          {[...Array(45)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{ 
                top: `${i * 5}px`,
                height: '1px',
                background: i % 3 === 0 
                  ? 'rgba(0, 0, 0, 0.08)' 
                  : 'rgba(0, 0, 0, 0.04)',
              }}
            />
          ))}
          
          {/* Page depth effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Back Cover (slight depth) - Space Encyclopedia Style */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            backgroundColor: '#050508',
            transform: 'translateZ(-15px)',
            filter: 'brightness(0.4)',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
          }}
        />
      </div>
    </motion.div>
  );
};
