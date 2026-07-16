import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Nebula() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.005;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.1;
    }
  });

  const clouds = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80 - 20,
      ] as [number, number, number],
      scale: Math.random() * 15 + 8,
      color: ["#4a1a6b", "#1a2a4b", "#2a1a3b", "#1a3a4b", "#3a1a2b", "#1a2a3b", "#2a3a1b", "#1a1a3b"][i],
      opacity: Math.random() * 0.04 + 0.015,
      rotation: Math.random() * Math.PI,
    }));
  }, []);

  return (
    <group ref={ref}>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          position={cloud.position}
          rotation={[cloud.rotation, cloud.rotation * 0.5, 0]}
        >
          <planeGeometry args={[cloud.scale, cloud.scale * 0.6]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
