import { Article } from '@models/Article';

interface BookProps {
  article: Article;
  onClick: () => void;
}

/**
 * Realistic Book Component
 * CSS-based 3D book with realistic appearance
 */
export const Book: React.FC<BookProps> = ({ article, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="book-container group cursor-pointer flex-shrink-0"
      style={{
        perspective: '1500px',
        width: '120px',
        height: '180px',
      }}
    >
      <div 
        className="book relative transition-all duration-300 ease-out"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-10deg)',
        }}
      >
        {/* Book Cover */}
        <div
          className="book-cover absolute inset-0 rounded-r-sm shadow-2xl flex flex-col justify-between p-3"
          style={{
            backgroundColor: article.coverColor,
            backgroundImage: `linear-gradient(to bottom right, ${article.coverColor}, ${article.coverColor}dd)`,
            boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.3), inset -2px 0 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Title */}
          <div className="text-white font-bold text-sm leading-tight drop-shadow-md">
            {article.title}
          </div>
          
          {/* Author */}
          <div className="text-white text-xs opacity-90 mt-auto">
            {article.author}
          </div>

          {/* Spine shadow effect */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-2"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
            }}
          />
        </div>

        {/* Book Spine (3D effect) */}
        <div
          className="book-spine absolute left-0 top-0 bottom-0 rounded-l-sm"
          style={{
            width: '30px',
            backgroundColor: article.coverColor,
            transform: 'rotateY(-90deg) translateX(-15px)',
            transformOrigin: 'right',
            backgroundImage: `linear-gradient(to right, ${article.coverColor}bb, ${article.coverColor})`,
            boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="h-full flex items-center justify-center">
            <span 
              className="text-white text-xs font-semibold writing-mode-vertical transform rotate-180 px-1 text-center line-clamp-3"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '10px',
              }}
            >
              {article.title.substring(0, 40)}
            </span>
          </div>
        </div>

        {/* Book Pages (side view) */}
        <div
          className="book-pages absolute right-0 top-0 bottom-0"
          style={{
            width: '6px',
            background: 'linear-gradient(to right, #f9f7f4, #e8e6e0)',
            borderRadius: '0 2px 2px 0',
            boxShadow: 'inset -1px 0 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Page lines */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-gray-300"
              style={{ top: `${(i + 1) * 12}px` }}
            />
          ))}
        </div>
      </div>

      {/* Book Info on Hover */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
        <div className="font-semibold">{article.category}</div>
        <div className="text-gray-300 text-xs">{article.date}</div>
      </div>
    </div>
  );
};
