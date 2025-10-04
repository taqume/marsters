import { Article } from '@models/Article';
import { Calendar } from 'lucide-react';

interface BookProps {
  article: Article;
  onClick: () => void;
}

/**
 * Modern Book Component with Enhanced Visual Effects
 * Features: Glow effects, category badge, animated hover states
 */
export const Book: React.FC<BookProps> = ({ article, onClick }) => {
  // Generate a lighter color for glow effect
  const glowColor = article.coverColor + '40';

  return (
    <div
      onClick={onClick}
      className="book-container group cursor-pointer flex-shrink-0 relative"
      style={{
        perspective: '1500px',
        width: '145px',
        height: '215px',
      }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent)`,
        }}
      />

      <div 
        className="book relative transition-all duration-500 ease-out group-hover:scale-110"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-10deg)',
        }}
      >
        {/* Book Cover with Modern Design */}
        <div
          className="book-cover absolute inset-0 rounded-r-lg shadow-2xl flex flex-col justify-between p-3 overflow-hidden group-hover:shadow-3xl transition-all duration-500"
          style={{
            backgroundColor: article.coverColor,
            backgroundImage: `
              linear-gradient(135deg, ${article.coverColor}ee 0%, ${article.coverColor} 50%, ${article.coverColor}cc 100%),
              radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent)
            `,
            boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.4), inset -3px 0 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Decorative pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
              )`,
            }}
          />

          {/* Title */}
          <div className="relative z-10 text-white font-bold text-xs leading-tight drop-shadow-lg mt-8">
            {article.title}
          </div>
          
          {/* Bottom Info */}
          <div className="relative z-10 space-y-1">
            <div className="text-white/90 text-[10px] font-medium">
              {article.author}
            </div>
            <div className="flex items-center space-x-1 text-white/70 text-[9px]">
              <Calendar className="w-2.5 h-2.5" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Spine shadow effect */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-3"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
            }}
          />

          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Book Spine (3D effect) with enhanced design */}
        <div
          className="book-spine absolute left-0 top-0 bottom-0 rounded-l-lg"
          style={{
            width: '32px',
            backgroundColor: article.coverColor,
            transform: 'rotateY(-90deg) translateX(-16px)',
            transformOrigin: 'right',
            backgroundImage: `
              linear-gradient(to right, ${article.coverColor}aa, ${article.coverColor}),
              repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)
            `,
            boxShadow: '-3px 0 15px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div className="h-full flex items-center justify-center px-1">
            <span 
              className="text-white text-[9px] font-bold writing-mode-vertical transform rotate-180 text-center"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {article.title.substring(0, 35)}
            </span>
          </div>
        </div>

        {/* Book Pages (side view) with more detail */}
        <div
          className="book-pages absolute right-0 top-0 bottom-0"
          style={{
            width: '7px',
            background: 'linear-gradient(to right, #f5f3f0, #e5e3df, #f9f7f4)',
            borderRadius: '0 3px 3px 0',
            boxShadow: 'inset -2px 0 4px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Page lines */}
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-gray-400/30"
              style={{ top: `${(i + 1) * 10}px` }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Hover Tooltip */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 z-20 pointer-events-none">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm">
          <div className="font-bold text-sm mb-1">{article.category}</div>
          <div className="text-gray-300 text-xs flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
          {/* Arrow pointing up */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-gray-900" />
        </div>
      </div>
    </div>
  );
};
