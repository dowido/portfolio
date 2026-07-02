import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Custom neon cursor:
 *  - Inner dot  → snaps immediately to mouse (via inline style)
 *  - Outer ring → follows with spring lag (framer-motion)
 *  - Expands on hoverable elements
 *  - Hidden on touch devices
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const el = e.target;
      const isInteractive =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.classList.contains('brutal-btn') ||
        el.classList.contains('lb-row') ||
        el.classList.contains('project-card') ||
        el.classList.contains('skill-card');
      setHovered(!!isInteractive);
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [visible, ringX, ringY]);

  return (
    <>
      {/* Outer spring-lagged ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 54 : clicking ? 26 : 36,
          height: hovered ? 54 : clicking ? 26 : 36,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'rgba(0,255,200,0.7)' : 'rgba(223,255,0,0.55)'}`,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, opacity 0.3s',
        }}
      />

      {/* Inner dot — instant snap */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: clicking ? 4 : 6,
          height: clicking ? 4 : 6,
          borderRadius: '50%',
          background: hovered ? '#00FFC8' : '#DFFF00',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: visible ? 1 : 0,
          transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`,
          boxShadow: hovered
            ? '0 0 10px rgba(0,255,200,0.8), 0 0 20px rgba(0,255,200,0.4)'
            : '0 0 8px rgba(223,255,0,0.7)',
          transition: 'background 0.15s, box-shadow 0.15s, opacity 0.3s, width 0.1s, height 0.1s',
        }}
      />
    </>
  );
}
