"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { createNoise2D } from "simplex-noise";

const BLOCK_SIZE = 1;
const TERRAIN_SIZE = 20;

export const OverworldScene = () => {
  const waterRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.InstancedMesh>(null!);
  const particleCount = 80;
  const noise = createNoise2D();

  // Water shader
  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, color: { value: new THREE.Color("#3bb9ff") } },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin((pos.x + time) * 3.0) * 0.08 + cos((pos.y + time) * 3.0) * 0.08;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  // Terrain blocks
  const terrain = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let x = -TERRAIN_SIZE / 2; x < TERRAIN_SIZE / 2; x++) {
      for (let z = -TERRAIN_SIZE / 2; z < TERRAIN_SIZE / 2; z++) {
        const height = Math.floor((noise(x / 5, z / 5) + 1) * 2);
        for (let y = 0; y <= height; y++) {
          positions.push([x * BLOCK_SIZE, y * BLOCK_SIZE, z * BLOCK_SIZE]);
        }
      }
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Animate water
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.time.value += delta;
    }

    // Animate particles
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < particleCount; i++) {
        const y = (time * 0.3 + i) % 5;
        matrix.setPosition(Math.sin(i) * 5, y, Math.cos(i) * 5);
        particlesRef.current.setMatrixAt(i, matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Sky and Fog */}
      <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={6} />
      <fog attach="fog" args={["#88ccff", 10, 60]} />

      {/* Terrain */}
      {terrain.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
          <meshStandardMaterial color={pos[1] > 1 ? "#4CAF50" : "#8B4513"} />
        </mesh>
      ))}

      {/* Water */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <planeGeometry args={[TERRAIN_SIZE, TERRAIN_SIZE, 64, 64]} />
        <primitive object={waterMaterial} attach="material" />
      </mesh>

      {/* Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="white" transparent opacity={0.6} />
      </instancedMesh>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} />
      <OrbitControls enableZoom={false} />
    </>
  );
};
