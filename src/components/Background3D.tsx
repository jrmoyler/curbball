import { Canvas } from '@react-three/fiber';
import { OrbitControls, Cloud, Sky } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// 3D House component
const House = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* House body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#E8D4B8" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[1.2, 0.8, 4]} />
        <meshStandardMaterial color="#C1666B" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.3, 0.76]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.05]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Window */}
      <mesh position={[0.5, 0.6, 0.76]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
    </group>
  );
};

// 3D Tree component
const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.6, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Foliage - bottom */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <coneGeometry args={[0.6, 0.8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      {/* Foliage - middle */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[0.5, 0.7, 8]} />
        <meshStandardMaterial color="#2E8B57" />
      </mesh>
      {/* Foliage - top */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.4, 0.6, 8]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
    </group>
  );
};

// Animated car
const Car = ({ position, speed }: { position: [number, number, number]; speed: number }) => {
  const carRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={carRef} position={position}>
      {/* Car body */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial color="#FF4444" />
      </mesh>
      {/* Car top */}
      <mesh position={[0.1, 0.65, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 0.55]} />
        <meshStandardMaterial color="#CC3333" />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.4, 0.15, 0.35]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0.4, 0.15, -0.35]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[-0.4, 0.15, 0.35]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[-0.4, 0.15, -0.35]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
};

// Ground/Street
const Ground = () => {
  return (
    <>
      {/* Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 10]} />
        <meshStandardMaterial color="#4A4A4A" />
      </mesh>
      {/* Curb */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -4]} receiveShadow>
        <planeGeometry args={[50, 2]} />
        <meshStandardMaterial color="#8B8B8B" />
      </mesh>
      {/* Grass behind curb */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -7]} receiveShadow>
        <planeGeometry args={[50, 6]} />
        <meshStandardMaterial color="#7CFC00" />
      </mesh>
    </>
  );
};

export const Background3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 3, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Sky */}
        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.6}
          azimuth={0.25}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Hemisphere light for natural lighting */}
        <hemisphereLight
          color="#87CEEB"
          groundColor="#8B7355"
          intensity={0.6}
        />

        {/* Clouds */}
        <Cloud opacity={0.3} speed={0.2} position={[-5, 8, -10]} />
        <Cloud opacity={0.25} speed={0.3} position={[8, 9, -12]} />
        <Cloud opacity={0.2} speed={0.15} position={[2, 10, -15]} />

        {/* Ground and Street */}
        <Ground />

        {/* Houses in the background */}
        <House position={[-8, 0, -8]} />
        <House position={[-4, 0, -9]} />
        <House position={[2, 0, -8.5]} />
        <House position={[6, 0, -9]} />
        <House position={[10, 0, -8]} />

        {/* Trees */}
        <Tree position={[-6, 0, -7]} />
        <Tree position={[0, 0, -7.5]} />
        <Tree position={[4, 0, -7]} />
        <Tree position={[8, 0, -7.5]} />

        {/* Animated cars on the street */}
        <Car position={[-10, 0, 1]} speed={0.05} />
        <Car position={[5, 0, -1]} speed={0.03} />

        {/* Camera controls - disabled for game, but available for debugging */}
        {/* <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} /> */}
      </Canvas>
    </div>
  );
};
