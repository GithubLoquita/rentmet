import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

function VoxelCity() {
  const group = useRef<THREE.Group>(null);
  
  // Create a grid of cubes for a "pixel city" feel
  const cubes = useMemo(() => {
    const temp = [];
    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        const height = Math.random() * 4 + 1;
        temp.push({ position: [x * 1.2, height / 2 - 2, z * 1.2], height });
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Box args={[1, cube.height, 1]} position={cube.position as any}>
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#111111" : "#050505"} 
              emissive="#ffffff"
              emissiveIntensity={Math.random() * 0.05}
            />
          </Box>
        </Float>
      ))}
      <gridHelper args={[100, 50, "#222222", "#050505"]} position={[0, -2.1, 0]} />
    </group>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden select-none">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[10, 10, 15]} fov={35} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <VoxelCity />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white/5 backdrop-blur-sm text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8"
          >
            Now in Beta — Free Listings
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[140px] font-display font-bold leading-[0.85] tracking-tighter mb-10"
          >
            Student <br />Housing, <br />
            <span className="text-muted">Reimagined.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted mb-12 max-w-xl leading-snug font-medium"
          >
            Find premium PGs, hostels and rentals with a seamless experience. 
            The elite platform for modern student living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <button className="px-10 py-5 bg-white text-black font-black text-lg hover:bg-white/90 transition-all flex items-center gap-3">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-transparent border border-border text-white font-black text-lg hover:border-white transition-all">
              List Free
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end z-20 pointer-events-none">
         <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted rotate-90 origin-left">
           Established 2024
         </div>
         <div className="flex gap-12">
            {[
              { val: "10K+", label: "Students" },
              { val: "500+", label: "Listings" },
              { val: "50+", label: "Areas" }
            ].map((stat, i) => (
              <div key={i} className="text-right">
                <div className="text-3xl font-bold font-display leading-tight">{stat.val}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted">{stat.label}</div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}
