import { Canvas } from '@react-three/fiber';
import { Sky, Cloud } from '@react-three/drei';
import { Suspense } from 'react';

// 3D House component
function House({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* House body */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.6, 1.5, 4]} />
        <meshStandardMaterial color="#c44536" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.5, 1.01]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Windows */}
      <mesh position={[-0.6, 1.3, 1.01]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
      <mesh position={[0.6, 1.3, 1.01]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#87ceeb" />
      </mesh>
    </group>
  );
}

// 3D Tree component
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial color="#2e8b57" />
      </mesh>
    </group>
  );
}

// 3D Car component
function Car({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Car body */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.6, 1]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      {/* Car top */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.9]} />
        <meshStandardMaterial color="#cc3333" />
      </mesh>
      {/* Wheels */}
      <mesh position={[-0.7, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.7, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-0.7, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.7, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}

// Ground/Street component
function Ground() {
  return (
    <group>
      {/* Street */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 30]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Yellow street lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[0.2, 30]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>
      
      {/* Sidewalk left */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-12, 0.02, 0]} receiveShadow>
        <planeGeometry args={[24, 30]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      
      {/* Sidewalk right */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0.02, 0]} receiveShadow>
        <planeGeometry args={[24, 30]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting setup for proper shadows and illumination */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light (sun) with shadows */}
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Hemisphere light for realistic outdoor lighting */}
      <hemisphereLight
        args={['#87ceeb', '#f0e68c', 0.6]}
      />
      
      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[10, 20, 5]}
        inclination={0.6}
        azimuth={0.25}
      />
      
      {/* Clouds */}
      <Cloud position={[-10, 8, -20]} speed={0.2} opacity={0.5} />
      <Cloud position={[10, 10, -25]} speed={0.15} opacity={0.4} />
      <Cloud position={[0, 12, -30]} speed={0.25} opacity={0.6} />
      
      {/* Ground and street */}
      <Ground />
      
      {/* Houses on left sidewalk */}
      <House position={[-12, 0, -15]} />
      <House position={[-12, 0, -8]} />
      <House position={[-12, 0, 0]} />
      <House position={[-12, 0, 8]} />
      
      {/* Houses on right sidewalk */}
      <House position={[12, 0, -12]} />
      <House position={[12, 0, -4]} />
      <House position={[12, 0, 5]} />
      
      {/* Trees scattered around */}
      <Tree position={[-15, 0, -10]} />
      <Tree position={[-15, 0, 3]} />
      <Tree position={[15, 0, -7]} />
      <Tree position={[15, 0, 2]} />
      
      {/* Parked cars */}
      <Car position={[-9, 0, -5]} />
      <Car position={[9, 0, -2]} />
    </>
  );
}

export const Background3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        shadows
        camera={{
          position: [0, 5, 15],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
