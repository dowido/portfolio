import { useEffect, useRef } from 'react';

const COLORS = ['#DFFF00', '#00FFC8', '#FF6B6B', '#A78BFA', '#FFD700', '#ffffff', '#00FFC8'];

export default function ClickSparks() {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnBurst = (x, y, count = 20) => {
      for (let i = 0; i < count; i++) {
        const angle  = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
        const speed  = Math.random() * 8 + 3;
        const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
        const isLine = Math.random() > 0.5; // some particles are lines/sparks
        particles.current.push({
          x, y,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed - Math.random() * 3,
          life:  1,
          decay: Math.random() * 0.018 + 0.022,
          size:  isLine ? Math.random() * 3 + 1 : Math.random() * 5 + 2,
          color,
          isLine,
          length: Math.random() * 12 + 6,
        });
      }
    };

    const onClick = (e) => spawnBurst(e.clientX, e.clientY);
    window.addEventListener('click', onClick);

    let rafId;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.life > 0);

      for (const p of particles.current) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.18;      // gravity
        p.vx *= 0.97;      // air drag
        p.life -= p.decay;

        const alpha = Math.max(0, p.life);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 8;

        if (p.isLine) {
          // Spark line in direction of velocity
          ctx.strokeStyle = p.color;
          ctx.lineWidth   = p.size * p.life;
          const mag = Math.hypot(p.vx, p.vy) || 1;
          const nx = p.vx / mag, ny = p.vy / mag;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - nx * p.length * p.life, p.y - ny * p.length * p.life);
          ctx.stroke();
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
      }}
    />
  );
}
