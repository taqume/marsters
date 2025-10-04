import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Article } from '@models/Article';
import { Book } from '../Book/Book';
import { BookshelfFallback } from './BookshelfFallback';

interface BookshelfProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
  selectedArticle: Article | null;
}

/**
 * 3D Bookshelf Component
 * Displays articles as books on a virtual shelf
 */
export const Bookshelf: React.FC<BookshelfProps> = ({ 
  articles, 
  onBookSelect,
  selectedArticle 
}) => {
  // Fallback to 2D if WebGL not supported
  if (typeof window !== 'undefined' && !window.WebGLRenderingContext) {
    return (
      <BookshelfFallback 
        articles={articles} 
        onBookSelect={onBookSelect} 
      />
    );
  }

  // Calculate book positions so upper shelves are filled first
  const booksPerShelf = 5;
  const totalBooks = articles.length;
  const totalRows = Math.ceil(totalBooks / booksPerShelf);
  // Fill upper shelves first: books are packed from top row to bottom
  const getBookPosition = (index: number): [number, number, number] => {
    // Compute row and col so that first row is always full if possible
    const row = Math.floor(index / booksPerShelf);
    const col = index % booksPerShelf;
    return [
      (col - booksPerShelf / 2) * 1.5,
      -row * 1.5,
      0
    ];
  };

  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-surface rounded-xl shadow-2xl">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Books - fill upper shelves first */}
        {Array.from({ length: totalRows }).flatMap((_, rowIdx) => {
          // For each row, fill up to booksPerShelf books
          return Array.from({ length: booksPerShelf }).map((_, colIdx) => {
            const bookIdx = rowIdx * booksPerShelf + colIdx;
            if (bookIdx >= totalBooks) return null;
            const article = articles[bookIdx];
            return (
              <Book
                key={article.id}
                article={article}
                position={[(colIdx - booksPerShelf / 2) * 1.5, -rowIdx * 1.5, 0]}
                onClick={() => onBookSelect(article)}
                isSelected={selectedArticle?.id === article.id}
              />
            );
          });
        })}

        {/* Realistic shelves under each row */}
        {Array.from({ length: Math.ceil(articles.length / booksPerShelf) }).map((_, rowIdx) => (
          <mesh
            key={rowIdx}
            position={[0, -rowIdx * 1.5 - 0.7, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[booksPerShelf * 1.5, 0.15, 0.3]} />
            <meshStandardMaterial color="#a67c52" roughness={0.8} />
          </mesh>
        ))}

        {/* Camera controls */}
        <OrbitControls 
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Shelf background */}
        <mesh position={[0, 0, -0.5]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
      </Canvas>
    </div>
  );
};
