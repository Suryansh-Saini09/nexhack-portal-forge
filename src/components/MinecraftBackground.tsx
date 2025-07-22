import React, { useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Sky, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Texture URLs for Minecraft blocks
const textureUrls = {
  dirt: 'https://i.imgur.com/xxa3y6f.png',
  grass: 'https://i.imgur.com/43M7s6c.png',
  stone: 'https://i.imgur.com/M3DEc2B.png',
  diamond: 'https://i.imgur.com/rG3Yj2r.png',
  redstone: 'https://i.imgur.com/8Yv4A7f.png',
  netherrack: 'https://i.imgur.com/n6s0d8t.png',
  tree_side: 'https://i.imgur.com/D4lA1bA.png',
  tree_top: 'https://i.imgur.com/O6S3d1U.png',
  leaves: 'https://i.imgur.com/3pQD1s2.png',
};

const Block = ({ position, blockType }: { position: [number, number, number], blockType: keyof typeof textureUrls }) => {
  const texture = useLoader(THREE.TextureLoader, textureUrls[blockType]);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  const isGlowing = blockType === 'diamond' || blockType === 'redstone';
  const color = blockType === 'diamond' ? '#00ffff' : '#ff0000';

  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} emissive={isGlowing ? color : 'black'} emissiveIntensity={isGlowing ? 2 : 0} />
      {isGlowing && <pointLight color={color} distance={5} intensity={5} />}
    </mesh>
  );
};

const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {[...Array(4)].map((_, i) => (
        <Block key={i} position={[0, i, 0]} blockType="tree_side" />
      ))}
      <Block position={[0, 4, 0]} blockType="tree_top" />
      {[...Array(5)].map((_, i) =>
        [...Array(5)].map((__, j) => {
          if (i === 2 && j === 2) return null;
          return <Block key={`${i}-${j}`} position={[i - 2, 4, j - 2]} blockType="leaves" />;
        })
      )}
      {[...Array(3)].map((_, i) =>
        [...Array(3)].map((__, j) => {
          if (i === 1 && j === 1) return null;
          return <Block key={`top-${i}-${j}`} position={[i - 1, 5, j - 1]} blockType="leaves" />;
        })
      )}
    </group>
  );
};

const Particles = ({ count }: { count: number }) => {
  const positions = useMemo(() => {
    const particles = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      particles[i] = (Math.random() - 0.5) * 30;
    }
    return particles;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ff4400" />
    </points>
  );
};

import { ScrollControls } from '@react-three/drei';

const Scene = () => {
  const scroll = useScroll();
  const { camera, gl } = useThree();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      gl.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(gl.domElement);
    return () => resizeObserver.disconnect();
  }, [gl, camera]);

  useFrame((state) => {
    const scrollOffset = scroll.offset;
    camera.position.y = -scrollOffset * 30;

    const x = state.mouse.x * 0.1;
    const y = state.mouse.y * 0.1;
    camera.rotation.x = -y;
    camera.rotation.y = -x;
  });

  return null;
}

const MinecraftBackground: React.FC = () => {
  const worldSize = 30;
  const world = useMemo(() => {
    const blocks = [];
    // Overworld
    for (let x = -worldSize / 2; x < worldSize / 2; x++) {
      for (let z = -worldSize / 2; z < worldSize / 2; z++) {
        blocks.push({ position: [x, 0, z], blockType: 'grass' as const });
        blocks.push({ position: [x, -1, z], blockType: 'dirt' as const });
      }
    }
    // Underground
    for (let x = -worldSize / 2; x < worldSize / 2; x++) {
      for (let z = -worldSize / 2; z < worldSize / 2; z++) {
        for (let y = -2; y > -10; y--) {
          blocks.push({ position: [x, y, z], blockType: 'stone' as const });
        }
      }
    }
    // Ores
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * worldSize) - worldSize / 2;
      const y = -Math.floor(Math.random() * 8) - 2;
      const z = Math.floor(Math.random() * worldSize) - worldSize / 2;
      blocks.push({ position: [x, y, z], blockType: 'diamond' as const });
    }
    for (let i = 0; i < 40; i++) {
      const x = Math.floor(Math.random() * worldSize) - worldSize / 2;
      const y = -Math.floor(Math.random() * 8) - 2;
      const z = Math.floor(Math.random() * worldSize) - worldSize / 2;
      blocks.push({ position: [x, y, z], blockType: 'redstone' as const });
    }
    // Nether
    for (let x = -worldSize / 2; x < worldSize / 2; x++) {
      for (let z = -worldSize / 2; z < worldSize / 2; z++) {
        for (let y = -10; y > -20; y--) {
          blocks.push({ position: [x, y, z], blockType: 'netherrack' as const });
        }
      }
    }
    return blocks;
  }, [worldSize]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} />
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
          <fog attach="fog" args={['#ff0000', 10, 50]} />
          {world.map((block, i) => (
            <Block key={i} position={block.position as [number, number, number]} blockType={block.blockType} />
          ))}
          <Tree position={[5, 1, 5]} />
          <Tree position={[-5, 1, -5]} />
          <Tree position={[5, 1, -5]} />
          <Tree position={[-5, 1, 5]} />
          <Particles count={500} />
          <ScrollControls pages={3}>
            <Scene />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MinecraftBackground;
