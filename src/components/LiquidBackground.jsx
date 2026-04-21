import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const LiquidBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    smoothX.set(mousePosition.x);
    smoothY.set(mousePosition.y);
  }, [mousePosition, smoothX, smoothY]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1, background: '#09090e' }}>
      {/* Deep Background Gradients */}
      <div 
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '70vw',
          height: '70vh',
          background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(9,9,14,0) 70%)',
          filter: 'blur(80px)',
          animation: 'pulse 10s infinite alternate'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vh',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(9,9,14,0) 70%)',
          filter: 'blur(80px)'
        }}
      />
      
      {/* Liquid Mouse Follower */}
      <motion.div
        style={{
          position: 'absolute',
          top: -250,
          left: -250,
          width: 500,
          height: 500,
          x: smoothX,
          y: smoothY,
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0) 60%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(30px, -30px); }
        }
      `}</style>
    </div>
  );
};

export default LiquidBackground;
