import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const LiquidGlass = ({ position, rotation, scale = 1, type = 'torus', width = 1, height = 1, float = true }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current && type !== 'card') {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  const content = (
    <mesh ref={meshRef} scale={scale} rotation={rotation} position={float ? [0, 0, 0] : position}>
      {type === 'torus' && <torusGeometry args={[1, 0.4, 64, 128]} />}
      {type === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
      {type === 'capsule' && <capsuleGeometry args={[0.5, 1, 32, 64]} />}
      {type === 'card' && <RoundedBox args={[width, height, 0.15]} radius={0.05} smoothness={4} />}
      {/* Race inspired sharp shape: Dodecahedron */}
      {type === 'hexagon' && <dodecahedronGeometry args={[1, 0]} />}
      
      <MeshTransmissionMaterial
        backside
        backsideThickness={1.5}
        thickness={1.0}
        chromaticAberration={0.06}
        anisotropicBlur={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
        roughness={0} // Pure liquid look
        ior={1.6} // High refraction
        color="#ffffff"
        transmission={1.0}
        distortion={0.3}
        distortionScale={0.5}
        temporalDistortion={0.1}
        attenuationDistance={2}
        attenuationColor="#ffffff"
        resolution={512}
      />
    </mesh>
  );

  return float ? (
    <Float speed={3} rotationIntensity={type === 'card' ? 0.2 : 1} floatIntensity={0.5} position={position}>
      {content}
    </Float>
  ) : content;
};

export default LiquidGlass;
