import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollCameraProps {
  scrollProgress: number;
}

const CAMERA_PATH: { y: number; z: number; lookAt: [number, number, number] }[] = [
  { y: 0, z: 18, lookAt: [0, 0, 0] },       // Sun (Hero)
  { y: -22, z: 16, lookAt: [0, -22, 0] },    // Mercury (About)
  { y: -44, z: 14, lookAt: [0, -44, 0] },    // Venus (Skills)
  { y: -66, z: 16, lookAt: [0, -66, 0] },    // Earth (Projects)
  { y: -88, z: 14, lookAt: [0, -88, 0] },    // Mars (Journey)
  { y: -110, z: 18, lookAt: [0, -110, 0] },  // Jupiter (Certificates)
  { y: -132, z: 16, lookAt: [0, -132, 0] },  // Saturn (Achievements)
  { y: -154, z: 14, lookAt: [0, -154, 0] },  // Uranus (GitHub)
  { y: -176, z: 16, lookAt: [0, -176, 0] },  // Neptune (Contact)
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVec3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 18));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    const totalSegments = CAMERA_PATH.length - 1;
    const rawIndex = scrollProgress * totalSegments;
    const index = Math.min(Math.floor(rawIndex), totalSegments - 1);
    const t = rawIndex - index;

    const from = CAMERA_PATH[index];
    const to = CAMERA_PATH[Math.min(index + 1, totalSegments)];

    const easedT = t * t * (3 - 2 * t);

    targetPos.current.set(
      lerp(from.y, to.y, easedT) * 0 + 0,
      lerp(from.y, to.y, easedT),
      lerp(from.z, to.z, easedT)
    );

    targetLookAt.current.set(...lerpVec3(from.lookAt, to.lookAt, easedT));

    camera.position.lerp(targetPos.current, 0.08);
    currentLookAt.current.lerp(targetLookAt.current, 0.08);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
