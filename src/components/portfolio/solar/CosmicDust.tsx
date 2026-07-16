import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CosmicDust() {
  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  const positions = new Float32Array(800 * 3);
  for (let i = 0; i < 800; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 160;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 160;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={800}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#888888"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
