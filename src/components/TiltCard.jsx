import { useRef, useCallback } from 'react';

/**
 * Wraps children in a container that applies a 3D tilt effect
 * based on mouse position relative to the card.
 * 
 * Props:
 *   max     – max tilt degrees (default 12)
 *   glare   – show a glare overlay (default true)
 */
export default function TiltCard({ children, max = 12, glare = true, className = '', style = {} }) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);   // -1 → 1
      const dy = (e.clientY - cy) / (rect.height / 2);   // -1 → 1

      const rotX =  -dy * max;   // tilt up/down
      const rotY =   dx * max;   // tilt left/right

      ref.current.style.transform =
        `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`;
      ref.current.style.transition = 'transform 0.1s ease';

      if (glare && glareRef.current) {
        const glareX = ((e.clientX - rect.left) / rect.width)  * 100;
        const glareY = ((e.clientY - rect.top)  / rect.height) * 100;
        glareRef.current.style.background =
          `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 70%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  }, [max, glare]);

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!ref.current) return;
    ref.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, [glare]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
