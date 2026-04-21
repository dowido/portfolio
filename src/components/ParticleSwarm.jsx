import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const EnergyParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#DFFF00'),
    uSize: 40.0,
  },
  // Vertex Shader
  `
    varying float vAlpha;
    uniform float uTime;
    uniform float uSize;
    void main() {
      vec3 pos = position;
      
      // Fluid-like motion
      float offset = pos.x + pos.y + pos.z;
      pos.y += sin(uTime * 0.5 + offset) * 0.2;
      pos.x += cos(uTime * 0.4 + offset) * 0.2;
      pos.z += sin(uTime * 0.3 + offset) * 0.1;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = uSize * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      // Distant objects get smaller and more transparent
      vAlpha = (0.5 + 0.5 * sin(uTime + offset)) * (1.0 / length(pos.z));
    }
  `,
  // Fragment Shader
  `
    varying float vAlpha;
    uniform vec3 uColor;
    void main() {
      // Create soft circular glow
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;
      float strength = 1.0 - dist * 2.0;
      strength = pow(strength, 3.0); // Sharper falloff
      
      gl_FragColor = vec4(uColor, strength * vAlpha);
    }
  `
);

extend({ EnergyParticleMaterial });

const ParticleSwarm = ({ count = 4000 }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const [positions, uvs] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      uvs[i * 2] = Math.random();
      uvs[i * 2 + 1] = Math.random();
    }
    return [positions, uvs];
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-uv"
          count={count}
          array={uvs}
          itemSize={2}
        />
      </bufferGeometry>
      <energyParticleMaterial 
        ref={materialRef} 
        transparent 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSwarm;
