import { Article } from '@models/Article';
import { User, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BookProps {
  article: Article;
  onClick: () => void;
}

/**
 * NASA Space-Themed Modern Book Component
 * Features: Space aesthetics, holographic effects, realistic depth
 */
export const Book: React.FC<BookProps> = ({ article, onClick }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Get translated content
  const title = currentLang === 'tr' ? article.translations.tr.title : article.title;
  const author = currentLang === 'tr' ? article.translations.tr.author : article.author;
  return (
    <div
      onClick={onClick}
      className="book-container group cursor-pointer flex-shrink-0 relative"
      style={{
        perspective: '1200px',
        width: '145px',
        height: '215px',
      }}
    >
      {/* Outer glow - space aura effect */}
      <div 
        className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-80 blur-2xl transition-all duration-700 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${article.coverColor}60, ${article.coverColor}20, transparent)`,
        }}
      />

      {/* Orbital ring effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-700">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${article.coverColor}40, transparent)`,
            animation: 'spin 4s linear infinite',
          }}
        />
      </div>

      <div 
        className="book relative transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-8deg)',
        }}
      >
        {/* Main Book Cover - NASA Document Style */}
        <div
          className="book-cover absolute inset-0 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm border border-white/10 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-700"
          style={{
            background: `
              linear-gradient(135deg, ${article.coverColor}f5 0%, ${article.coverColor}dd 50%, ${article.coverColor}cc 100%)
            `,
          }}
        >
          {/* NASA-style grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Top accent bar - NASA style */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          {/* Content container */}
          <div className="relative h-full flex flex-col justify-between p-4">
            {/* Title section */}
            <div className="flex-1 flex items-start pt-2">
              <h3 className="text-white font-bold text-[11px] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide">
                {title}
              </h3>
            </div>
            
            {/* Bottom info card */}
            <div className="space-y-2 bg-black/20 backdrop-blur-md rounded-lg p-2.5 border border-white/10">
              <div className="flex items-center space-x-1.5">
                <User className="w-3 h-3 text-white/80" />
                <span className="text-white/90 text-[9px] font-medium truncate">
                  {author}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3 h-3 text-white/80" />
                <span className="text-white/80 text-[8px] font-mono">
                  {article.date}
                </span>
              </div>
            </div>
          </div>

          {/* Left edge shadow for depth */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-4 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
            }}
          />

          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Book Spine (3D effect) - Space mission style */}
        <div
          className="book-spine absolute left-0 top-0 bottom-0 rounded-l-lg"
          style={{
            width: '28px',
            background: `linear-gradient(to right, ${article.coverColor}bb, ${article.coverColor}dd)`,
            transform: 'rotateY(-90deg) translateX(-14px)',
            transformOrigin: 'right',
            boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="h-full flex items-center justify-center px-1 relative">
            {/* Spine decorative lines */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.2) 8px, rgba(255,255,255,0.2) 9px)',
            }} />
            <span 
              className="text-white text-[8px] font-bold relative z-10"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              }}
            >
              {article.title.substring(0, 30)}
            </span>
          </div>
        </div>

        {/* Book Pages (side view) - realistic paper stack */}
        <div
          className="book-pages absolute right-0 top-0 bottom-0 z-10"
          style={{
            width: '8px',
            background: 'linear-gradient(to right, #f8f6f3, #fff, #f8f6f3)',
            borderRadius: '0 4px 4px 0',
            boxShadow: 'inset -1px 0 3px rgba(0, 0, 0, 0.2), 2px 0 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Page lines - more realistic */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-gray-400/20"
              style={{ top: `${(i + 1) * 10}px` }}
            />
          ))}
        </div>
      </div>

      {/* NASA-style Hover Info Panel */}
      <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-2 z-20 pointer-events-none">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl" />
          
          {/* Info card */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-gray-900/95 backdrop-blur-xl px-5 py-3 rounded-xl shadow-2xl border border-blue-400/30">
            {/* NASA badge indicator */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-[10px] font-mono uppercase tracking-wider">Mission File</span>
            </div>
            
            {/* Category */}
            <div className="font-bold text-sm mb-1.5 text-white">{article.category}</div>
            
            {/* Metadata */}
            <div className="flex items-center space-x-3 text-gray-300 text-[10px] font-mono">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-blue-400" />
                <span>{article.date}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-blue-400/50" />
              <span className="text-blue-300">NASA Archive</span>
            </div>
            
            {/* Arrow pointing up */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
};
