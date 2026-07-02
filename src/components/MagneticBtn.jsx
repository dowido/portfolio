import { useRef, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Wraps children in a motion.div that magnetically attracts toward
 * the cursor when within `radius` pixels, and snaps back on mouse leave.
 *
 * Props:
 *   radius   – detection radius in px (default 70)
 *   strength – 0–1 pull strength (default 0.35)
 */
export default function MagneticBtn({ children, radius = 70, strength = 0.35, className = '', ...rest }) {
  const ref = useRef(null);

  const springCfg = { stiffness: 200, damping: 18, mass: 0.5 };
  const x = useSpring(0, springCfg);
  const y = useSpring(0, springCfg);

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    }
  }, [radius, strength, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
