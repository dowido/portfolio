import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';

const STAGES = [
  { id: null,         label: 'BOOT SEQUENCE', num: '00', color: '#DFFF00' },
  { id: 'work',       label: 'SELECTED WORK', num: '01', color: '#DFFF00' },
  { id: 'skills',     label: 'TECH ARSENAL',  num: '02', color: '#00FFC8' },
  { id: 'about',      label: 'ORIGIN STORY',  num: '03', color: '#A78BFA' },
  { id: 'hackathons', label: 'LEADERBOARD',   num: '04', color: '#FFD700' },
  { id: 'contact',    label: '⚔ BOSS LEVEL',  num: '05', color: '#FF6B6B' },
];

function HudCorners() {
  return (
    <>
      <span className="hud-corner hud-c-tl">┌─</span>
      <span className="hud-corner hud-c-tr">─┐</span>
      <span className="hud-corner hud-c-bl">└─</span>
      <span className="hud-corner hud-c-br">─┘</span>
    </>
  );
}

export default function GameHUD() {
  const { scrollYProgress } = useScroll();
  const [xp, setXp]         = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [scrollY, setScrollY]   = useState(0);
  const [fps, setFps]           = useState(60);
  const [blink, setBlink]       = useState(true);

  // Track XP from scroll
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setXp(Math.round(v * 100)));
    return unsub;
  }, [scrollYProgress]);

  // Track current stage
  useEffect(() => {
    const ids = ['work', 'skills', 'about', 'hackathons', 'contact'];
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      let idx = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && y + window.innerHeight * 0.4 >= el.offsetTop) idx = i + 1;
      });
      setStageIdx(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Real FPS counter
  useEffect(() => {
    let last = performance.now(), frames = 0, rafId;
    const tick = (now) => {
      frames++;
      if (now - last >= 600) {
        setFps(Math.min(60, Math.round(frames * 1000 / (now - last))));
        frames = 0; last = now;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Status blink
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 800);
    return () => clearInterval(t);
  }, []);

  const stage    = STAGES[stageIdx];
  const pipCount = Math.floor(xp / 10);

  return (
    <div className="game-hud" aria-hidden="true">

      {/* ── Top-left: Player info ── */}
      <div className="hud-panel hud-tl">
        <HudCorners />
        <p className="hud-key">PLAYER</p>
        <p className="hud-val">DONALD OWIDO</p>
        <p className="hud-key">CLASS</p>
        <p className="hud-val hud-neon">FULL-STACK DEV</p>
        <p className="hud-key">STATUS</p>
        <p className="hud-val hud-green" style={{ opacity: blink ? 1 : 0.4 }}>
          ■ AVAILABLE FOR HIRE
        </p>
      </div>

      {/* ── Top-right: Stage + XP ── */}
      <div className="hud-panel hud-tr">
        <HudCorners />
        <p className="hud-key">STAGE</p>
        <p className="hud-val" style={{ color: stage.color }}>
          {stage.num} ─ {stage.label}
        </p>
        <p className="hud-key">XP</p>
        <div className="hud-pips">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="hud-pip"
              style={{ background: i < pipCount ? stage.color : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>
        <p className="hud-val hud-mono">{xp} / 100</p>
      </div>

      {/* ── Bottom-left: Coordinates + FPS ── */}
      <div className="hud-panel hud-bl">
        <HudCorners />
        <p className="hud-key">COORDINATES</p>
        <p className="hud-val hud-mono">
          X:0000 Y:{String(Math.round(scrollY)).padStart(5, '0')}
        </p>
        <p className="hud-key">PERFORMANCE</p>
        <p
          className="hud-val hud-mono"
          style={{ color: fps >= 55 ? '#00FFC8' : fps >= 30 ? '#DFFF00' : '#FF6B6B' }}
        >
          {fps} FPS
        </p>
      </div>

      {/* ── Bottom-right: Objectives ── */}
      <div className="hud-panel hud-br">
        <HudCorners />
        <p className="hud-key">OBJECTIVES</p>
        {STAGES.slice(1).map((s, i) => {
          const done   = stageIdx > i;
          const active = stageIdx === i + 1;
          return (
            <p
              key={s.id}
              className={`hud-obj ${done ? 'hud-obj-done' : active ? 'hud-obj-active' : ''}`}
              style={{ color: active ? s.color : done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.2)' }}
            >
              <span>{done ? '✓' : active ? '▶' : '○'}</span>
              {s.label}
            </p>
          );
        })}
      </div>

    </div>
  );
}
