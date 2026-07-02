import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTION_META = {
  work:       { num: '01', label: 'SELECTED WORK', sub: 'PROJECTS UNLOCKED',    color: '#DFFF00' },
  skills:     { num: '02', label: 'TECH ARSENAL',  sub: 'LOADING LOADOUT...',   color: '#00FFC8' },
  about:      { num: '03', label: 'ORIGIN STORY',  sub: 'INTEL INCOMING',       color: '#A78BFA' },
  hackathons: { num: '04', label: 'LEADERBOARD',   sub: 'RANKING IN PROGRESS',  color: '#FFD700' },
  contact:    { num: '05', label: '⚔ BOSS LEVEL',  sub: 'ARE YOU READY?',       color: '#FF6B6B' },
};

export default function LevelFlash() {
  const [flash, setFlash]   = useState(null);
  const [visible, setVisible] = useState(false);
  const seenRef = useRef(new Set());

  useEffect(() => {
    const observers = Object.entries(SECTION_META).map(([id, data]) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !seenRef.current.has(id)) {
          seenRef.current.add(id);
          setFlash(data);
          setVisible(true);
          setTimeout(() => setVisible(false), 2400);
        }
      }, { threshold: 0.25 });

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {visible && flash && (
        <motion.div
          className="level-flash"
          style={{ borderColor: flash.color }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Scanline overlay inside flash */}
          <div className="level-flash-scan" />

          <motion.div
            className="level-flash-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.12, duration: 0.25 }}
          >
            <span className="lf-num" style={{ color: flash.color }}>
              STAGE {flash.num}
            </span>
            <span className="lf-title">{flash.label}</span>
            <span className="lf-sub" style={{ color: flash.color }}>
              ─── {flash.sub} ───
            </span>
          </motion.div>

          {/* Side decorations */}
          <span className="lf-deco lf-deco-l" style={{ color: flash.color }}>▶▶▶</span>
          <span className="lf-deco lf-deco-r" style={{ color: flash.color }}>◀◀◀</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
