import { useScroll, useSpring, motion } from 'framer-motion';

/**
 * A thin neon gradient bar pinned to the very top of the viewport.
 * Fills left→right as the user scrolls the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Spring-smooth the raw scroll value so the bar feels physical
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #DFFF00, #00FFC8, #DFFF00)',
        backgroundSize: '200% 100%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(223,255,0,0.6), 0 0 20px rgba(0,255,200,0.3)',
        animation: 'progressShimmer 3s linear infinite',
      }}
    />
  );
}
