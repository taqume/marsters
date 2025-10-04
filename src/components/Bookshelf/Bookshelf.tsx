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

  // Calculate book positions in a grid layout
  const booksPerShelf = 5;
  const getBookPosition = (index: number): [number, number, number] => {
    const row = Math.floor(index / booksPerShelf);
    const col = index % booksPerShelf;
    
    return [
      (col - booksPerShelf / 2) * 1.5,
      -row * 1.5,
      0
    ];
  };

  return (
  <div className="w-full h-[600px] bg-gradient-to-br from-blue-100 via-white to-blue-300 dark:from-gray-900 dark:via-gray-700 dark:to-gray-900 rounded-2xl shadow-2xl border-4 border-blue-200/40 backdrop-blur-md">
  <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Books */}
        {articles.map((article, index) => (
          <Book
            key={article.id}
            article={article}
            position={getBookPosition(index)}
            onClick={() => onBookSelect(article)}
            isSelected={selectedArticle?.id === article.id}
          />
        ))}

        {/* Camera controls */}
        <OrbitControls 
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Modern glass background */}
        <mesh position={[0, 0, -0.7]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshPhysicalMaterial color="#e0e7ef" metalness={0.7} roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} transparent opacity={0.6} />
        </mesh>
      </Canvas>
    </div>
  );
};
