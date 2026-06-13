'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function generateParticles(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.cbrt(Math.random()) * radius;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const particles = useMemo(() => generateParticles(2000, 10), []);
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.015;
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += mouse.y * delta * 0.05;
      pointsRef.current.rotation.y += mouse.x * delta * 0.05;
    }
  });
  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#10b981" size={0.03} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function BackgroundStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => generateParticles(1000, 20), []);
  useFrame((state, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.005;
  });
  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.012} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

function TechGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  useFrame((state, delta) => {
    if (gridRef.current) gridRef.current.position.z = (gridRef.current.position.z + delta * 0.3) % 2;
  });
  return <gridHelper ref={gridRef} args={[60, 60, '#10b981', '#065f46']} position={[0, -5, 0]} />;
}

function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < 15; i++) {
      const startPoint: [number, number, number] = [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8 - 3];
      const endPoint: [number, number, number] = [startPoint[0] + (Math.random() - 0.5) * 6, startPoint[1] + (Math.random() - 0.5) * 6, startPoint[2] + (Math.random() - 0.5) * 4];
      result.push({ start: startPoint, end: endPoint });
    }
    return result;
  }, []);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });
  return (
    <group ref={groupRef}>
      {lines.map((line, i) => <Line key={i} points={[line.start, line.end]} color="#10b981" lineWidth={1} opacity={0.15} transparent />)}
    </group>
  );
}

function TechSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const spheres = useMemo(() => [
    { position: [-5, 2, -6] as [number, number, number], scale: 0.8, speed: 0.7 },
    { position: [6, -2, -5] as [number, number, number], scale: 0.5, speed: 1.1 },
    { position: [4, 3, -7] as [number, number, number], scale: 0.6, speed: 0.9 },
    { position: [-4, -3, -4] as [number, number, number], scale: 0.4, speed: 1.3 },
    { position: [0, 4, -8] as [number, number, number], scale: 0.7, speed: 0.6 },
  ], []);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((sphere, i) => {
        const { speed, position } = spheres[i];
        const time = state.clock.elapsedTime;
        sphere.position.y = position[1] + Math.sin(time * speed) * 0.8;
        sphere.position.x = position[0] + Math.cos(time * speed * 0.7) * 0.4;
      });
    }
  });
  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <Float key={i} speed={sphere.speed} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={sphere.position} scale={sphere.scale}>
            <icosahedronGeometry args={[1, 1]} />
            <MeshDistortMaterial color="#10b981" transparent opacity={0.15} wireframe distort={0.3} speed={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ring1Ref.current) { ring1Ref.current.rotation.x += delta * 0.1; ring1Ref.current.rotation.y += delta * 0.05; }
    if (ring2Ref.current) { ring2Ref.current.rotation.x -= delta * 0.08; ring2Ref.current.rotation.z += delta * 0.06; }
    if (ring3Ref.current) { ring3Ref.current.rotation.y += delta * 0.07; ring3Ref.current.rotation.z -= delta * 0.04; }
  });
  return (
    <group position={[0, 0, -5]}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, Math.PI / 8]}>
        <torusGeometry args={[6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#10b981" />
          <FloatingParticles />
          <BackgroundStars />
          <TechSpheres />
          <OrbitalRings />
          <ConnectionLines />
          <TechGrid />
          {/* fog supprimÃ© â€” causait le fond noir sur le panneau */}
        </Suspense>
      </Canvas>
    </div>
  );
}

