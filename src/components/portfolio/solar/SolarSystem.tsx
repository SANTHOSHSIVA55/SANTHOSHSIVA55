import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Starfield } from "./Starfield";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { OrbitRing } from "./OrbitRing";
import { Nebula } from "./Nebula";
import { CosmicDust } from "./CosmicDust";
import { ScrollCamera } from "./ScrollCamera";

interface SolarSystemProps {
  scrollProgress: number;
}

export function SolarSystem({ scrollProgress }: SolarSystemProps) {
  return (
    <div className="fixed inset-0 -z-10" style={{ background: "#020202" }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 50, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ScrollCamera scrollProgress={scrollProgress} />

          {/* Ambient */}
          <ambientLight intensity={0.08} />

          {/* Deep space */}
          <color attach="background" args={["#020202"]} />
          <fog attach="fog" args={["#020202", 40, 120]} />

          {/* Stars */}
          <Starfield />
          <CosmicDust />
          <Nebula />

          {/* Sun */}
          <Sun />

          {/* Orbit rings */}
          <OrbitRing radius={8} opacity={0.06} />
          <OrbitRing radius={14} opacity={0.05} />
          <OrbitRing radius={20} opacity={0.06} />
          <OrbitRing radius={26} opacity={0.04} />
          <OrbitRing radius={32} opacity={0.05} />
          <OrbitRing radius={38} opacity={0.04} />
          <OrbitRing radius={44} opacity={0.03} />
          <OrbitRing radius={50} opacity={0.04} />

          {/* Mercury - About */}
          <Planet
            position={[8, -22, 0]}
            radius={0.8}
            color="#A0A0A0"
            rotationSpeed={0.15}
            orbitSpeed={0.08}
          />

          {/* Venus - Skills */}
          <Planet
            position={[-12, -44, 2]}
            radius={1.1}
            color="#E8C468"
            rotationSpeed={0.1}
            orbitSpeed={0.06}
            hasAtmosphere
            atmosphereColor="#E8C468"
          />

          {/* Earth - Projects */}
          <Planet
            position={[10, -66, -2]}
            radius={1.2}
            color="#4A90D9"
            emissive="#1a3a6b"
            rotationSpeed={0.12}
            orbitSpeed={0.05}
            hasAtmosphere
            atmosphereColor="#6BB5FF"
          />

          {/* Mars - Journey */}
          <Planet
            position={[-8, -88, 1]}
            radius={0.9}
            color="#C1440E"
            rotationSpeed={0.11}
            orbitSpeed={0.04}
            hasAtmosphere
            atmosphereColor="#C1440E"
          />

          {/* Jupiter - Certificates */}
          <Planet
            position={[12, -110, -1]}
            radius={2.8}
            color="#C88B3A"
            rotationSpeed={0.06}
            orbitSpeed={0.03}
          />

          {/* Saturn - Achievements */}
          <Planet
            position={[-10, -132, 2]}
            radius={2.2}
            color="#E8D5A3"
            rotationSpeed={0.07}
            orbitSpeed={0.025}
            hasRing
            ringColor="#D4C5A0"
          />

          {/* Uranus - GitHub */}
          <Planet
            position={[6, -154, -1]}
            radius={1.6}
            color="#7EC8E3"
            rotationSpeed={0.09}
            orbitSpeed={0.02}
            hasAtmosphere
            atmosphereColor="#A8E0F0"
          />

          {/* Neptune - Contact */}
          <Planet
            position={[-8, -176, 0]}
            radius={1.5}
            color="#3F5FC4"
            rotationSpeed={0.08}
            orbitSpeed={0.018}
            hasAtmosphere
            atmosphereColor="#5B7FE8"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
