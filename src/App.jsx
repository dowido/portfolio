import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';

import ParticleSwarm from './components/ParticleSwarm';
import LiquidGlass from './components/LiquidGlass';

import './index.css';

// Scene rendering the bubbles and particles behind everything
function Scene() {
  const groupRef = useRef();

  // Subtle rotation of the entire bubble group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <>
      <ParticleSwarm count={4000} />
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
      </EffectComposer>

      <Environment preset="city" />
      
      <group ref={groupRef}>
        <LiquidGlass position={[-4, 2, -2]} scale={1.2} type="sphere" float />
        <LiquidGlass position={[5, -1, -4]} scale={2.5} type="sphere" float />
        <LiquidGlass position={[-2, -3, -1]} scale={0.8} type="sphere" float />
        <LiquidGlass position={[3, 4, -5]} scale={1.8} type="sphere" float />
        <LiquidGlass position={[0, 0, -3]} scale={1.5} type="sphere" float />
      </group>
    </>
  );
}

// Fade in up animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function App() {
  return (
    <>
      {/* 3D Background */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10 }}
      >
        <React.Suspense fallback={null}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#DFFF00" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
          <Scene />
        </React.Suspense>
      </Canvas>

      <div className="noise"></div>

      {/* DOM Overlay - Scrolling normally */}
      <div className="scroll-content">
        <nav>
            <div className="logo">D.</div>
            {/* Pure text navigation */}
            <div className="nav-links">
                <a href="#work">WORK</a>
                <a href="#about">ABOUT</a>
                <a href="#contact">CONTACT</a>
            </div>
        </nav>

        <section className="hero">
            <motion.h1 
                className="hero-text-huge"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
              DONATELLO
            </motion.h1>
            <motion.h1 
                className="hero-text-huge"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
            >
              CREATIVE DEV
            </motion.h1>
            
            <motion.div 
               className="hero-sub"
               initial="hidden"
               animate="visible"
               variants={fadeInUp}
               transition={{ delay: 0.4 }}
            >
                <p className="hero-desc">
                  I build high-octane, over-engineered web experiences because standard templates are boring. Currently based in Nakuru.
                </p>
                <a href="#work" className="brutal-btn glass-target">INITIALIZE ///</a>
            </motion.div>
        </section>

        <div className="marquee-container">
            <div className="marquee-content">
                /// FRONTEND DEVELOPMENT /// CREATIVE CODING /// WEBGL /// PERFORMANCE /// FRONTEND DEVELOPMENT /// CREATIVE CODING /// WEBGL /// PERFORMANCE ///
            </div>
        </div>

        <section className="projects" id="work">
            {[
              { id: "01", title: "PROJECT ALPHA", desc: "A WebGL physics simulator designed to absolutely melt laptop GPUs. Written in pure GLSL and spite." },
              { id: "02", title: "DOMAIN EXPANSION", desc: "Volumetric 3D particle renderer mapping mathematical signed distance fields. Because using images was too easy." },
              { id: "03", title: "SYSTEM OVERRIDE", desc: "Experimental brutalist UI study. Aggressive typography, monochromatic accents, and heavy glassmorphism." },
              { id: "04", title: "ARCHIVE", desc: "A graveyard of abandoned ideas, deprecated frameworks, and designs that my AI assistant hated." }
            ].map((proj, idx) => (
              <motion.div 
                key={proj.id}
                className="project-card glass-target"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
              >
                  <div className="project-num">{proj.id}</div>
                  <h2 className="project-title">{proj.title}</h2>
                  <p className="project-desc">{proj.desc}</p>
              </motion.div>
            ))}
        </section>

        <section className="about" id="about">
            <motion.div 
              className="about-content glass-target"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
                <h2 className="project-title" style={{ marginTop: 0 }}>BEHIND THE CODE</h2>
                <p className="project-desc" style={{ maxWidth: '100%', margin: '0 auto', fontSize: '1rem' }}>
                    I write code. Sometimes it works. Usually, I'm just staring at a screen waiting for something to compile while my GPU fans scream for mercy. I specialize in turning simple DOM elements into unnecessarily complex mathematical operations. 
                </p>
            </motion.div>
        </section>

        <footer className="footer" id="contact">
            <motion.h1 
              className="hero-text-huge"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              SAY HELLO
            </motion.h1>
            <motion.a 
              href="mailto:donatello@example.com" 
              className="brutal-btn glass-target"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              TRANSMIT MESSAGE ///
            </motion.a>
        </footer>
      </div>
    </>
  );
}
