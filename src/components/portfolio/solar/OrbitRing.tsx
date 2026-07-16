import { useMemo } from "react";
import * as THREE from "three";

interface OrbitRingProps {
  radius: number;
  color?: string;
  opacity?: number;
  segments?: number;
}

export function OrbitRing({
  radius,
  color = "#ffffff",
  opacity = 0.08,
  segments = 128,
}: OrbitRingProps) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius, segments]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}
