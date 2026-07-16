import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Sun() {
  const ref = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const coronaRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.05);
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z = t * 0.02;
      coronaRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.08);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Core */}
      <mesh ref={ref}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef} scale={1.15}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C00"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona */}
      <mesh ref={coronaRef} scale={1.5}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Far glow */}
      <mesh scale={2.2}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light from sun */}
      <pointLight color="#FDB813" intensity={3} distance={100} decay={2} />
      <pointLight color="#FFA500" intensity={1.5} distance={60} decay={2} />
    </group>
  );
}
