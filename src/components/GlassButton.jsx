import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

const GlassButton = ({ label, onClick, position, width = 2.2, height = 0.7, fontSize = 0.22 }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.05 : 1;
      const targetVec = new THREE.Vector3(targetScale, targetScale, targetScale);
      meshRef.current.scale.lerp(targetVec, 0.15);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        {/* Slightly sharper corners for a premium performance look */}
        <RoundedBox args={[width, height, 0.1]} radius={0.05} smoothness={4} />
        
        <MeshTransmissionMaterial
          backside
          backsideThickness={1.0}
          thickness={0.8}
          chromaticAberration={0.06}
          anisotropicBlur={0.2}
          clearcoat={1}
          roughness={0}
          ior={1.6}
          color={hovered ? "#DFFF00" : "#ffffff"} 
          transmission={hovered ? 1.0 : 0.9}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          resolution={512}
        />
        
        <Text
          position={[0, 0, 0.08]}
          fontSize={fontSize}
          color={hovered ? "#050505" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          {label}
        </Text>
      </mesh>
    </group>
  );
};

export default GlassButton;
