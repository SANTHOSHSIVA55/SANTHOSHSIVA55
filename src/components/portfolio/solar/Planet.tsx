import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  radius: number;
  color: string;
  emissive?: string;
  rotationSpeed?: number;
  orbitSpeed?: number;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  hasRing?: boolean;
  ringColor?: string;
}

export function Planet({
  position,
  radius,
  color,
  emissive,
  rotationSpeed = 0.1,
  orbitSpeed = 0,
  hasAtmosphere = false,
  atmosphereColor = "#ffffff",
  hasRing = false,
  ringColor = "#ffffff",
}: PlanetProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * rotationSpeed;
    }
    if (groupRef.current && orbitSpeed > 0) {
      groupRef.current.rotation.y = t * orbitSpeed;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * rotationSpeed * 0.5;
    }
  });

  const planetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.7,
        metalness: 0.2,
        emissive: emissive ? new THREE.Color(emissive) : undefined,
        emissiveIntensity: emissive ? 0.15 : 0,
      }),
    [color, emissive]
  );

  return (
    <group ref={groupRef} position={position}>
      {/* Planet body */}
      <mesh ref={ref} material={planetMaterial}>
        <sphereGeometry args={[radius, 48, 48]} />
      </mesh>

      {/* Atmosphere */}
      {hasAtmosphere && (
        <mesh ref={atmosphereRef} scale={1.08}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={atmosphereColor}
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Ring */}
      {hasRing && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Subtle point light */}
      <pointLight
        color={color}
        intensity={0.3}
        distance={radius * 8}
        decay={2}
      />
    </group>
  );
}
