import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Types
type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'leaves' | 'diamond_ore' | 'netherrack' | 'lava';
type Block = {
  position: [number, number, number];
  type: BlockType;
};

// Constants
const BLOCK_SIZE = 1;
const CHUNK_SIZE = 16;
const WORLD_HEIGHT = 64;
const NETHER_Y_LEVEL = -WORLD_HEIGHT / 2;

const textures = {
  grass: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/grass.png'),
  dirt: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/dirt.png'),
  stone: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/stone.png'),
  wood: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/wood.png'),
  leaves: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/leaves.png'),
  diamond_ore: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/diamond_ore.png'),
  netherrack: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/netherrack.png'),
  lava: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/minecraft/lava.png'),
};

Object.values(textures).forEach(texture => {
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
});

const blockMaterials = {
  grass: new THREE.MeshLambertMaterial({ map: textures.grass }),
  dirt: new THREE.MeshLambertMaterial({ map: textures.dirt }),
  stone: new THREE.MeshLambertMaterial({ map: textures.stone }),
  wood: new THREE.MeshLambertMaterial({ map: textures.wood }),
  leaves: new THREE.MeshLambertMaterial({ map: textures.leaves }),
  diamond_ore: new THREE.MeshLambertMaterial({ map: textures.diamond_ore }),
  netherrack: new THREE.MeshLambertMaterial({ map: textures.netherrack }),
  lava: new THREE.MeshLambertMaterial({ map: textures.lava, emissive: 0xff6600, emissiveIntensity: 1 }),
};

const Voxel: React.FC<{ position: [number, number, number]; type: BlockType }> = ({ position, type }) => {
  return (
    <mesh position={position} material={blockMaterials[type]}>
      <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
    </mesh>
  );
};

const Particles: React.FC<{ count: number }> = ({ count }) => {
  const points = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * CHUNK_SIZE - CHUNK_SIZE / 2;
      const y = NETHER_Y_LEVEL - Math.random() * 20;
      const z = Math.random() * CHUNK_SIZE - CHUNK_SIZE / 2;
      p.set([x, y, z], i * 3);
    }
    return p;
  }, [count]);

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01;
        if (positions[i + 1] > NETHER_Y_LEVEL) {
          positions[i + 1] = NETHER_Y_LEVEL - 20;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ff6600" transparent opacity={0.7} />
    </points>
  );
};

const generateWorld = (): Block[] => {
  const blocks: Block[] = [];
  // Generate terrain
  for (let x = -CHUNK_SIZE / 2; x < CHUNK_SIZE / 2; x++) {
    for (let z = -CHUNK_SIZE / 2; z < CHUNK_SIZE / 2; z++) {
      const height = Math.floor(Math.random() * 5) + 10;
      for (let y = NETHER_Y_LEVEL - 20; y < height; y++) {
        let type: BlockType;
        if (y < NETHER_Y_LEVEL) {
          type = Math.random() > 0.9 ? 'lava' : 'netherrack';
        } else if (y === height - 1) {
          type = 'grass';
        } else if (y >= height - 4) {
          type = 'dirt';
        } else {
          type = 'stone';
        }
        blocks.push({ position: [x, y, z], type });
      }
    }
  }

  // Generate diamond veins
  for (let i = 0; i < 20; i++) {
    const x = Math.floor(Math.random() * CHUNK_SIZE) - CHUNK_SIZE / 2;
    const y = Math.floor(Math.random() * (WORLD_HEIGHT / 2)) - WORLD_HEIGHT / 2;
    const z = Math.floor(Math.random() * CHUNK_SIZE) - CHUNK_SIZE / 2;
    const blockIndex = blocks.findIndex(b => b.position[0] === x && b.position[1] === y && b.position[2] === z);
    if (blockIndex !== -1 && blocks[blockIndex].type === 'stone') {
      blocks[blockIndex].type = 'diamond_ore';
    }
  }

  // Generate trees
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(Math.random() * CHUNK_SIZE) - CHUNK_SIZE / 2;
    const z = Math.floor(Math.random() * CHUNK_SIZE) - CHUNK_SIZE / 2;
    const height = blocks.find(b => b.position[0] === x && b.position[2] === z)?.position[1] || 0;
    if (height > 0) {
      for (let y = 1; y <= 4; y++) {
        blocks.push({ position: [x, height + y, z], type: 'wood' });
      }
      for (let lx = -2; lx <= 2; lx++) {
        for (let ly = 4; ly <= 5; ly++) {
          for (let lz = -2; lz <= 2; lz++) {
            if (Math.random() > 0.5) {
              blocks.push({ position: [x + lx, height + ly, z + lz], type: 'leaves' });
            }
          }
        }
      }
    }
  }
  return blocks;
};

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.05;
    camera.lookAt(0, camera.position.y, 0);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollY / scrollMax;

      const y = 20 - scrollFraction * (WORLD_HEIGHT + 20);
      camera.position.y = y;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [camera]);

  return null;
};

const MinecraftScene: React.FC = () => {
  const world = useMemo(() => generateWorld(), []);

  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} camera={{ position: [0, 20, 30], fov: 75 }}>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#ff0000', 0, 100]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 5]} intensity={0.6} />
      {world.map((block, i) => (
        <Voxel key={i} {...block} />
      ))}
      <Particles count={500} />
      <CameraController />
    </Canvas>
  );
};

export default MinecraftScene;
