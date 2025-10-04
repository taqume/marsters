import { Article } from '@models/Article';
import { motion } from 'framer-motion';

interface BookProps {
  article: Article;
  onClick: () => void;
}

/**
 * Realistic 3D Book Component
 * Features: Thick cover, visible pages, realistic depth
 */
export const Book: React.FC<BookProps> = ({ article, onClick }) => {
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
        {/* Book Cover - Front */}
        <div
          className="book-cover absolute inset-0 rounded-r-md overflow-hidden"
          style={{
            backgroundColor: article.coverColor,
            backgroundImage: `linear-gradient(135deg, ${article.coverColor}f0 0%, ${article.coverColor} 60%, ${article.coverColor}dd 100%)`,
            boxShadow: `
              8px 8px 20px rgba(0, 0, 0, 0.4),
              inset -5px 0 15px rgba(0, 0, 0, 0.3),
              inset 5px 5px 10px rgba(255, 255, 255, 0.1)
            `,
            transform: 'translateZ(15px)',
          }}
        >
          {/* Paper texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-5">
            {/* Title */}
            <div className="text-white font-bold text-sm leading-tight drop-shadow-lg pt-8">
              {article.title}
            </div>
            
            {/* Author */}
            <div className="text-white/90 text-xs font-medium drop-shadow-md pb-8">
              {article.author}
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

        {/* Book Spine (3D side) */}
        <div
          className="book-spine absolute left-0 top-0 bottom-0 rounded-l-md"
          style={{
            width: '45px',
            backgroundColor: article.coverColor,
            transform: 'rotateY(-90deg) translateX(-22.5px)',
            transformOrigin: 'right',
            backgroundImage: `linear-gradient(to right, ${article.coverColor}cc, ${article.coverColor}f0, ${article.coverColor}dd)`,
            boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.4), -5px 0 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="h-full flex items-center justify-center px-2">
            <span 
              className="text-white text-[10px] font-bold text-center drop-shadow-md"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              {article.title.substring(0, 30)}
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

        {/* Back Cover (slight depth) */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            backgroundColor: article.coverColor,
            transform: 'translateZ(-15px)',
            filter: 'brightness(0.7)',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
    </motion.div>
  );
};
