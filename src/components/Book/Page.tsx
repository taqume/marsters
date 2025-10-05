import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface PageProps {
  content: string;
  pageNumber: number;
  totalPages: number;
  isCurrentPage: boolean;
  isRightPage: boolean;
  onAnimationComplete?: () => void;
}

export const Page: React.FC<PageProps> = ({
  content,
  pageNumber,
  totalPages,
  isCurrentPage,
  isRightPage,
  onAnimationComplete
}) => {
  // Sayfa boyutları
  const WIDTH = 3;
  const HEIGHT = 4;
  const pageGeometry = useMemo(() => new THREE.PlaneGeometry(WIDTH, HEIGHT), []);

  // Sayfa pozisyonu ve rotasyonu için spring animasyonu
  const springs = useSpring({
    to: {
      rotationX: isCurrentPage ? 5 : 0, // X ekseni (hafif yukarı kalkma)
      rotationY: isRightPage 
        ? (isCurrentPage ? Math.PI : 0) // Sağ sayfa için Y ekseni
        : (isCurrentPage ? -Math.PI : 0), // Sol sayfa için Y ekseni
      rotationZ: 0,
      positionX: isRightPage ? WIDTH / 2 : -WIDTH / 2,
      positionY: 0,
      positionZ: isCurrentPage ? 0.5 : 0, // Z ekseni (öne çıkma efekti)
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    },
    from: {
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      positionX: isRightPage ? WIDTH / 2 : -WIDTH / 2,
      positionY: 0,
      positionZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    },
    config: {
      mass: 1,
      tension: 280,
      friction: 30,
      duration: 800
    },
    onRest: onAnimationComplete
  });

  // Sayfanın gölge efekti için malzeme
  const materials = useMemo(() => {
    return {
      page: new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide
      }),
      shadow: new THREE.MeshBasicMaterial({
        color: '#000000',
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      })
    };
  }, []);

  return (
    <animated.group
      position-x={springs.positionX}
      position-y={springs.positionY}
      position-z={springs.positionZ}
      rotation-x={springs.rotationX}
      rotation-y={springs.rotationY}
      rotation-z={springs.rotationZ}
      scale-x={springs.scaleX}
      scale-y={springs.scaleY}
      scale-z={springs.scaleZ}
    >
      {/* Ana sayfa */}
      <mesh geometry={pageGeometry} material={materials.page}>
        {/* Sayfa içeriği */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.12}
          maxWidth={WIDTH - 0.4}
          lineHeight={1.5}
          textAlign="left"
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {content}
        </Text>

        {/* Sayfa numarası */}
        <Text
          position={[0, -HEIGHT/2 + 0.2, 0.01]}
          fontSize={0.1}
          color="#666666"
          anchorX="center"
          anchorY="middle"
        >
          {`${pageNumber} / ${totalPages}`}
        </Text>
      </mesh>

      {/* Sayfa gölgesi */}
      <animated.mesh
        geometry={pageGeometry}
        position={[0, 0, -0.01]}
      >
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
        />
      </animated.mesh>

      {/* Sayfa kenarı */}
      <mesh position={[isRightPage ? -WIDTH/2 : WIDTH/2, 0, 0]}>
        <boxGeometry args={[0.05, HEIGHT, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </animated.group>
  );
};