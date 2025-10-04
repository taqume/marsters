import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import { Article } from '@models/Article';

interface BookProps {
  article: Article;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}

/**
 * 3D Book Component
 * Represents an article as a book on the shelf
 */
export const Book: React.FC<BookProps> = ({ article, position, onClick, isSelected }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animation - floating effect when hovered
  useFrame((state) => {
    if (meshRef.current) {
      if (hovered && !isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      } else if (!isSelected) {
        meshRef.current.position.y = position[1];
        meshRef.current.rotation.y = 0;
      }
    }
  });

  const scale = isSelected ? [2, 2, 2] : hovered ? [1.1, 1.1, 1.1] : [1, 1, 1];

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale as any}
      >
        {/* Book cover */}
        <boxGeometry args={[0.8, 1.2, 0.15]} />
        <meshStandardMaterial 
          color={article.coverColor} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Book title on spine */}
      {!isSelected && (
        <Text
          position={[0, 0, 0.08]}
          fontSize={0.07}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.65}
          overflowWrap="break-word"
          textAlign="center"
        >
          {article.title.length > 30
            ? article.title.slice(0, 27) + '...'
            : article.title}
        </Text>
      )}
    </group>
  );
};
