import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Cube({ position, size = 1, color = "white", delay = 0 }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(time + delay) * 0.2;
    mesh.current.rotation.y = time * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} ref={mesh}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={Math.random() > 0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function City() {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group}>
      {/* Central Spire */}
      <Cube position={[0, 2, 0]} size={1.5} color="white" delay={0} />
      
      {/* Surrounding Blocks */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 4 + Math.random() * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 1 + Math.random() * 3;
        
        return (
          <Cube 
            key={i} 
            position={[x, height / 2, z]} 
            size={0.8} 
            color={i % 2 === 0 ? "white" : "#333"} 
            delay={i * 0.2} 
          />
        );
      })}

      {/* Grid Floor */}
      <gridHelper args={[20, 20, "white", "#111"]} position={[0, 0, 0]} />
      
      {/* Floating Monoliths */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[5, 10, -5]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial color="white" speed={2} distort={0.5} radius={1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function VoxelCity() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <City />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
