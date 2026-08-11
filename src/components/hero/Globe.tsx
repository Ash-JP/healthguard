"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  GLOBE_RADIUS,
  ROTATION_SPEED,
  MAX_MOUSE_ROTATION,
  LOCATIONS,
  ROUTES,
  latLonToVec3,
  HubLocation,
} from "./HeroAnimations";

// ─── Lat/Lon wireframe grid ───────────────────────────────────────────────────

function LatLonGrid({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const SEG = 80;

    // Latitude lines (horizontal rings)
    for (let lat = -75; lat <= 75; lat += 15) {
      const phi = ((90 - lat) * Math.PI) / 180;
      for (let i = 0; i < SEG; i++) {
        const t1 = (i / SEG) * 2 * Math.PI;
        const t2 = ((i + 1) / SEG) * 2 * Math.PI;
        pts.push(
          new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(t1), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(t1)),
          new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(t2), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(t2)),
        );
      }
    }

    // Longitude lines (vertical semicircles)
    for (let lon = 0; lon < 360; lon += 15) {
      const theta = (lon * Math.PI) / 180;
      for (let i = 0; i < SEG; i++) {
        const phi1 = (i / SEG) * Math.PI;
        const phi2 = ((i + 1) / SEG) * Math.PI;
        pts.push(
          new THREE.Vector3(-radius * Math.sin(phi1) * Math.cos(theta), radius * Math.cos(phi1), radius * Math.sin(phi1) * Math.sin(theta)),
          new THREE.Vector3(-radius * Math.sin(phi2) * Math.cos(theta), radius * Math.cos(phi2), radius * Math.sin(phi2) * Math.sin(theta)),
        );
      }
    }

    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#C9A8DD" transparent opacity={0.12} />
    </lineSegments>
  );
}

// ─── Country hub marker ───────────────────────────────────────────────────────

function GlobeMarker({ loc, radius }: { loc: HubLocation; radius: number }) {
  const [hovered, setHovered] = useState(false);
  const pulseRef  = useRef<THREE.Mesh>(null!);
  const pulse2Ref = useRef<THREE.Mesh>(null!);
  const pos = useMemo(() => latLonToVec3(loc.lat, loc.lon, radius), [loc.lat, loc.lon, radius]);

  useFrame(({ clock }) => {
    const t  = (Math.sin(clock.getElapsedTime() * 1.1 + loc.lat * 0.3) + 1) / 2;
    const t2 = (Math.sin(clock.getElapsedTime() * 0.9 + loc.lon * 0.2 + 1.5) + 1) / 2;

    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(1 + t * 1.4);
      (pulseRef.current.material as THREE.MeshStandardMaterial).opacity = 0.38 * (1 - t * 0.85);
    }
    if (pulse2Ref.current) {
      pulse2Ref.current.scale.setScalar(1 + t2 * 2.2);
      (pulse2Ref.current.material as THREE.MeshStandardMaterial).opacity = 0.15 * (1 - t2 * 0.9);
    }
  });

  const inventoryColor = loc.inventory >= 95 ? "#86efac" : loc.inventory >= 90 ? "#fde68a" : "#f87171";

  return (
    <group
      position={[pos.x, pos.y, pos.z]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Core glowing dot */}
      <mesh>
        <sphereGeometry args={[0.026, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={hovered ? "#ffffff" : "#C9A8DD"}
          emissiveIntensity={hovered ? 5 : 2.8}
        />
      </mesh>

      {/* First pulse ring */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color="#9B5FB0"
          emissive="#9B5FB0"
          emissiveIntensity={1.2}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Second wider pulse ring */}
      <mesh ref={pulse2Ref}>
        <sphereGeometry args={[0.085, 10, 10]} />
        <meshStandardMaterial
          color="#713D87"
          emissive="#713D87"
          emissiveIntensity={0.8}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Hover tooltip — rendered as DOM via drei Html */}
      {hovered && (
        <Html
          distanceFactor={9}
          center
          style={{ pointerEvents: "none", zIndex: 200, userSelect: "none" }}
        >
          <div
            style={{
              background: "rgba(33, 14, 40, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(201, 168, 221, 0.28)",
              borderRadius: 14,
              padding: "14px 18px",
              minWidth: 180,
              color: "#fff",
              fontFamily: "var(--font-body), Inter, sans-serif",
              fontSize: 12,
              lineHeight: 1.5,
              boxShadow: "0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: "#C9A8DD", letterSpacing: -0.3 }}>
              {loc.name}
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Hospitals</span>
                <strong>{loc.hospitals.toLocaleString()}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Products</span>
                <strong>{loc.products.toLocaleString()}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Region</span>
                <strong>{loc.region}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginTop: 4, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Inventory</span>
                <strong style={{ color: inventoryColor }}>{loc.inventory}%</strong>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Supply route particle ────────────────────────────────────────────────────

function RouteParticle({
  curve,
  phase,
}: {
  curve: THREE.QuadraticBezierCurve3;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t   = ((clock.getElapsedTime() * 0.06 + phase) % 1);
    const pos = curve.getPoint(t);
    ref.current.position.copy(pos);
    // Fade near start and end
    const fade = Math.sin(t * Math.PI);
    (ref.current.material as THREE.MeshStandardMaterial).opacity = fade * 0.9;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.018, 8, 8]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#e8d5f5"
        emissiveIntensity={5}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Supply route arc ─────────────────────────────────────────────────────────

const PARTICLES_PER_ROUTE = 3;

function SupplyRouteArc({
  fromLoc,
  toLoc,
  radius,
}: {
  fromLoc: HubLocation;
  toLoc:   HubLocation;
  radius:  number;
}) {
  const { curve, lineGeometry } = useMemo(() => {
    const start = latLonToVec3(fromLoc.lat, fromLoc.lon, radius);
    const end   = latLonToVec3(toLoc.lat,   toLoc.lon,   radius);
    const mid   = start.clone().add(end).multiplyScalar(0.5);
    const lift  = mid.length() * 0.52;
    const ctrl  = mid.normalize().multiplyScalar(radius + lift);

    const c = new THREE.QuadraticBezierCurve3(start, ctrl, end);
    const g = new THREE.BufferGeometry().setFromPoints(c.getPoints(96));
    return { curve: c, lineGeometry: g };
  }, [fromLoc, toLoc, radius]);

    // Build a THREE.Line object directly to sidestep the JSX SVG/R3F <line> type conflict
    const line = useMemo(() => {
      const mat = new THREE.LineBasicMaterial({ color: "#9B5FB0", transparent: true, opacity: 0.32 });
      return new THREE.Line(lineGeometry, mat);
    }, [lineGeometry]);

    return (
    <group>
      {/* Arc line — rendered as a primitive to avoid JSX <line> vs SVG type conflict */}
      <primitive object={line} />

      {/* Travelling light particles */}
      {Array.from({ length: PARTICLES_PER_ROUTE }, (_, i) => (
        <RouteParticle
          key={i}
          curve={curve}
          phase={i / PARTICLES_PER_ROUTE}
        />
      ))}
    </group>
  );
}

// ─── Main scene (rendered inside Canvas) ─────────────────────────────────────

function GlobeScene({
  markersVisible,
  routesVisible,
}: {
  markersVisible: boolean;
  routesVisible:  boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const autoRot  = useRef(0);

  useFrame(({ mouse }, delta) => {
    autoRot.current += delta * ROTATION_SPEED;
    const targetY = autoRot.current + mouse.x * MAX_MOUSE_ROTATION;
    const targetX = -mouse.y * MAX_MOUSE_ROTATION * 0.5;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.025);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.025);
  });

  return (
    <group ref={groupRef}>
      {/* ── Glass sphere (front-face, very transparent) ── */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.055}
          roughness={0.08}
          metalness={0.05}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── Rim glow — back-face sphere, additive ── */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.025, 36, 36]} />
        <meshStandardMaterial
          color="#713D87"
          emissive="#9B5FB0"
          emissiveIntensity={0.55}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── Atmosphere haze ── */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.1, 32, 32]} />
        <meshStandardMaterial
          color="#9B5FB0"
          transparent
          opacity={0.038}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* ── Wireframe grid ── */}
      <LatLonGrid radius={GLOBE_RADIUS} />

      {/* ── Country markers ── */}
      {markersVisible &&
        LOCATIONS.map((loc) => (
          <GlobeMarker key={loc.id} loc={loc} radius={GLOBE_RADIUS} />
        ))}

      {/* ── Supply routes ── */}
      {routesVisible &&
        ROUTES.map((route) => {
          const from = LOCATIONS.find((l) => l.id === route.from);
          const to   = LOCATIONS.find((l) => l.id === route.to);
          if (!from || !to) return null;
          return (
            <SupplyRouteArc
              key={`${route.from}→${route.to}`}
              fromLoc={from}
              toLoc={to}
              radius={GLOBE_RADIUS}
            />
          );
        })}
    </group>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export interface GlobeProps {
  markersVisible: boolean;
  routesVisible:  boolean;
}

export default function Globe({ markersVisible, routesVisible }: GlobeProps) {
  return (
    <Canvas
      camera={{ fov: 48, position: [0, 0, 5.8], near: 0.1, far: 200 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      {/* Scene lighting — cool purple-tinted scheme */}
      <ambientLight intensity={0.22} />
      <pointLight position={[4,  5,  5]} intensity={1.6} color="#D4B8E8" />
      <pointLight position={[-3, -2,  3]} intensity={0.9} color="#713D87" />
      <pointLight position={[0,  6,  0]} intensity={0.5} color="#ffffff" />

      <Suspense fallback={null}>
        <GlobeScene
          markersVisible={markersVisible}
          routesVisible={routesVisible}
        />
      </Suspense>
    </Canvas>
  );
}
