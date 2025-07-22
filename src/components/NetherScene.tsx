"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const NETHER_SIZE = 20;

export const NetherScene = () => {
  const lavaRef = useRef<THREE.Mesh>(null!);
  const emberRef = useRef<THREE.InstancedMesh>(null!);
  const emberCount = 100;

  const lavaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          float pattern = sin(vUv.x * 10.0 + time * 3.0) * cos(vUv.y * 10.0 + time * 3.0);
          vec3 lavaColor = vec3(1.0, 0.2 + pattern * 0.2, 0.0);
          gl_FragColor = vec4(lavaColor, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state, delta) => {
    // Animate lava shader
    if (lavaRef.current) {
      const mat = lavaRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.time.value += delta;
    }

    // Floating embers animation
    if (emberRef.current) {
      const matrix = new THREE.Matrix4();
      const time = state.clock.getElapsedTime();
      for (let i = 0; i < emberCount; i++) {
        const x = Math.sin(i * 0.3 + time) * 5;
        const y = ((time * 0.5 + i) % 7) - 1;
        const z = Math.cos(i * 0.3 + time) * 5;
        matrix.setPosition(x, y, z);
        emberRef.current.setMatrixAt(i, matrix);
      }
      emberRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Nether Fog */}
      <fog attach="fog" args={["#2a0000", 5, 50]} />

      {/* Lava Pool */}
      <mesh ref={lavaRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[NETHER_SIZE, NETHER_SIZE, 64, 64]} />
        <primitive object={lavaMaterial} attach="material" />
      </mesh>

      {/* Floating Embers */}
      <instancedMesh ref={emberRef} args={[undefined, undefined, emberCount]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff6600"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Glow Lights */}
      <pointLight position={[0, 3, 0]} intensity={2} color="#ff3300" distance={15} />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#ff5500" distance={10} />
      <ambientLight intensity={0.3} />
    </>
  );
};
