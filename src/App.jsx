import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import ParticleSwarm from './components/ParticleSwarm';
import LiquidGlass from './components/LiquidGlass';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import TiltCard from './components/TiltCard';
import MagneticBtn from './components/MagneticBtn';
import ScrambleText from './components/ScrambleText';
import GameHUD from './components/GameHUD';
import LevelFlash from './components/LevelFlash';
import ClickSparks from './components/ClickSparks';

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

// ── Wild animation variants ──────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 16 } },
};

// Slam from below with overshoot
const wildSlam = {
  hidden:  { opacity: 0, y: 120, scale: 0.85, rotateX: -20 },
  visible: { opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { type: 'spring', stiffness: 260, damping: 14, mass: 0.9 } },
};

// Flip in from left
const flipInL = {
  hidden:  { opacity: 0, x: -160, rotateY: -60, scale: 0.8 },
  visible: { opacity: 1, x: 0, rotateY: 0, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 18 } },
};

// Flip in from right
const flipInR = {
  hidden:  { opacity: 0, x: 160, rotateY: 60, scale: 0.8 },
  visible: { opacity: 1, x: 0, rotateY: 0, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 18 } },
};

// Pop in from zero scale
const popIn = {
  hidden:  { opacity: 0, scale: 0, rotate: -8 },
  visible: { opacity: 1, scale: 1, rotate: 0,
    transition: { type: 'spring', stiffness: 450, damping: 16 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const projects = [
  {
    id: "01",
    role: "LEAD BACKEND DEV",
    title: "FINTECH BUDGETING APP",
    desc: "Engineered the backend architecture for a financial tracking application. Implemented core logic for financial data processing, M-Pesa API integration, and budgeting workflows.",
    tags: ["Python", "Django", "MySQL", "M-Pesa API"],
  },
  {
    id: "02",
    role: "FULL-STACK DEV",
    title: "MEDICAL QUEUE SYSTEM",
    desc: "Developed a comprehensive queue management system using Java, JSP, and MySQL. Designed the database schema and implemented SQL triggers and session management to ensure data integrity.",
    tags: ["Java", "JSP", "Servlets", "MySQL"],
  },
  {
    id: "03",
    role: "NETWORK ARCHITECT",
    title: "UNIVERSITY INFRASTRUCTURE",
    desc: "Designed a simulated network infrastructure for Egerton University utilizing Cisco Packet Tracer. Configured routing, switching, and subnets to model a scalable campus network.",
    tags: ["Cisco Packet Tracer", "Networking", "Subnetting"],
  },
  {
    id: "04",
    role: "RESEARCH",
    title: "AI IMAGE PROCESSING",
    desc: "Academic research focused on optimizing AI-driven digital image processing algorithms for mobile environments — pushing performance boundaries on constrained hardware.",
    tags: ["AI", "Mobile", "Image Processing", "Research"],
  },
];

const skills = [
  { category: "LANGUAGES & FRAMEWORKS", items: ["Python / Django", "Kotlin / Jetpack Compose", "Java / JSP / Servlets", "React"] },
  { category: "DATABASES & CLOUD", items: ["MySQL", "Firebase"] },
  { category: "APIS & INTEGRATIONS", items: ["M-Pesa API"] },
  { category: "SYSTEM & TOOLS", items: ["ADB", "Cisco Packet Tracer", "Git / GitHub"] },
];

const hackathons = [
  { name: "HACKERTON AI SUMMIT",       date: "MARCH 2026", score: 9800, tag: "AI & ML",        medal: "🥇" },
  { name: "NJORO HACKATHON",           date: "FEB 2026",   score: 8650, tag: "FULLSTACK",      medal: "🥈" },
  { name: "VERCEL BUILDATHON NAKURU", date: "DEC 2025",   score: 7420, tag: "WEB",            medal: "🥉" },
  { name: "AI HACKATHON KENYA",        date: "NOV 2025",   score: 6100, tag: "INNOVATION",    medal: "🏅" },
];

// Animated counter hook
function useCountUp(target, isVisible, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

// Single leaderboard row with its own score counter
function LeaderboardRow({ h, rank, isVisible, delay }) {
  const score = useCountUp(h.score, isVisible, 1800);
  const [floatingXP, setFloatingXP] = useState(null);

  const handleClick = useCallback(() => {
    const xp = Math.floor(Math.random() * 200) + 100;
    setFloatingXP(`+${xp} XP`);
    setTimeout(() => setFloatingXP(null), 900);
  }, []);

  const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32', 'rgba(167,139,250,0.9)'];
  const rankGlows  = [
    '0 0 30px rgba(255,215,0,0.35), 0 0 60px rgba(255,215,0,0.15)',
    '0 0 20px rgba(192,192,192,0.25)',
    '0 0 16px rgba(205,127,50,0.2)',
    'none',
  ];

  return (
    <motion.div
      className={`lb-row ${rank === 0 ? 'lb-row--gold' : ''}`}
      variants={fadeInUp}
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      {/* Rank number */}
      <div className="lb-rank" style={{ color: rankColors[rank] }}>
        <span className="lb-rank-num">{String(rank + 1).padStart(2, '0')}</span>
      </div>

      {/* Medal */}
      <div className="lb-medal">{h.medal}</div>

      {/* Event info */}
      <div className="lb-info">
        <span className="lb-name">{h.name}</span>
        <div className="lb-meta-row">
          <span className="lb-tag">{h.tag}</span>
          <span className="lb-date">{h.date}</span>
        </div>
      </div>

      {/* Score bar + number */}
      <div className="lb-score-col">
        <div className="lb-bar-track">
          <div
            className="lb-bar-fill"
            style={{
              width: isVisible ? `${(h.score / 10000) * 100}%` : '0%',
              background: rank === 0
                ? 'linear-gradient(90deg, #FFD700, #FFF176)'
                : rank === 1
                ? 'linear-gradient(90deg, #C0C0C0, #e8e8e8)'
                : rank === 2
                ? 'linear-gradient(90deg, #CD7F32, #e8a040)'
                : 'linear-gradient(90deg, var(--neon), var(--cyan))',
              boxShadow: rankGlows[rank],
              transition: `width ${1.8 + delay * 0.001}s cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          />
        </div>
        <span className="lb-score" style={{ color: rankColors[rank] }}>
          {score.toLocaleString()}
          <span className="lb-score-unit"> PTS</span>
        </span>
      </div>

      {/* Floating XP toast */}
      {floatingXP && (
        <span className="lb-xp-float">{floatingXP}</span>
      )}
    </motion.div>
  );
}

// Wrapper that tracks viewport entry and passes isVisible down to each row
function LbRows({ hackathons }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="lb-rows">
      {hackathons.map((h, i) => (
        <LeaderboardRow
          key={i}
          h={h}
          rank={i}
          isVisible={isVisible}
          delay={i * 150}
        />
      ))}
    </div>
  );
}

// ScrambleSectionTitle: triggers scramble when it enters the viewport
function ScrambleSectionTitle({ text, className = 'section-title' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <h2 ref={ref} className={className}>
      <ScrambleText text={text} trigger={inView} />
    </h2>
  );
}

// Konami code sequence
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function App() {
  const [konamiActive, setKonamiActive] = useState(false);
  const konamiSeq = useRef([]);

  // ── Konami code listener ──
  useEffect(() => {
    const onKey = (e) => {
      konamiSeq.current = [...konamiSeq.current, e.key].slice(-KONAMI.length);
      if (konamiSeq.current.join(',') === KONAMI.join(',')) {
        setKonamiActive(true);
        setTimeout(() => setKonamiActive(false), 4000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Lenis smooth scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── Hero parallax ──
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const donaldY  = useTransform(heroScroll, [0, 1], ['0%',  '-30%']);
  const owidoY   = useTransform(heroScroll, [0, 1], ['0%',  '-18%']);
  const eyebrowO = useTransform(heroScroll, [0, 0.4], [1, 0]);
  const subY     = useTransform(heroScroll, [0, 1], ['0%',  '-10%']);

  return (
    <>
      {/* Game overlays */}
      <CustomCursor />
      <ScrollProgress />
      <ClickSparks />
      <LevelFlash />
      <GameHUD />

      {/* Konami code overlay */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            className="konami-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="konami-text"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            >
              <span className="konami-big">🎮 GOD MODE</span>
              <span className="konami-sub">CHEAT CODE ACTIVATED</span>
              <span className="konami-code">↑↑↓↓←→←→BA</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        {/* ── NAV ── */}
        <nav>
          <MagneticBtn strength={0.3}><div className="logo">D.</div></MagneticBtn>
          <div className="nav-links">
            <MagneticBtn strength={0.4}><a href="#work">WORK</a></MagneticBtn>
            <MagneticBtn strength={0.4}><a href="#skills">SKILLS</a></MagneticBtn>
            <MagneticBtn strength={0.4}><a href="#about">ABOUT</a></MagneticBtn>
            <MagneticBtn strength={0.4}><a href="#hackathons">EVENTS</a></MagneticBtn>
            <MagneticBtn strength={0.4}><a href="#contact">CONTACT</a></MagneticBtn>
          </div>
        </nav>

        {/* ── HERO ── */}
        {/* ── HERO ── */}
        <section className={`hero ${konamiActive ? 'hero--konami' : ''}`} ref={heroRef}>
          {/* Available for hire badge */}
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="status-dot" />
            Available for Hire ✦
          </motion.div>

          <motion.p
            className="hero-eyebrow"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ opacity: eyebrowO }}
          >
            DONALD AURTHUR OWIDO &nbsp;///&nbsp; NJORO, NAKURU COUNTY, KENYA
          </motion.p>

          {/* Parallax hero names */}
          <motion.h1
            className="hero-text-huge hero-glitch"
            data-text="DONALD"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ y: donaldY }}
          >
            DONALD
          </motion.h1>
          <motion.h1
            className="hero-text-huge hero-glitch"
            data-text="OWIDO"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            style={{ y: owidoY }}
          >
            OWIDO
          </motion.h1>

          <motion.div
            className="hero-sub"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            style={{ y: subY }}
          >
            <p className="hero-desc">
              Driven CS student specializing in full-stack web &amp; native Android development.
              I architect robust backends, design responsive React interfaces, and engineer
              mobile solutions from the ground up with Jetpack Compose.
            </p>
            <div className="hero-cta-row">
              <MagneticBtn strength={0.4}>
                <a href="#work" className="brutal-btn brutal-btn--primary">VIEW WORK ///</a>
              </MagneticBtn>
              <MagneticBtn strength={0.4}>
                <a href="mailto:doncool933@gmail.com" className="brutal-btn brutal-btn--ghost glass-target">HIRE ME ///</a>
              </MagneticBtn>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="hero-scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span className="scroll-hint-text">SCROLL TO BEGIN</span>
            <span className="scroll-hint-arrow">↓</span>
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-container">
          <div className="marquee-content">
            /// FULL-STACK DEVELOPMENT /// ANDROID DEV /// JETPACK COMPOSE /// DJANGO /// REACT /// M-PESA API /// FIREBASE /// MYSQL /// FULL-STACK DEVELOPMENT /// ANDROID DEV /// JETPACK COMPOSE /// DJANGO /// REACT /// M-PESA API /// FIREBASE /// MYSQL ///
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <section className="projects" id="work">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-label">01 / PROJECTS</span>
            <ScrambleSectionTitle text="SELECTED WORK" />
          </motion.div>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {projects.map((proj, idx) => (
              <motion.div key={proj.id} variants={idx % 2 === 0 ? flipInL : flipInR}
                style={{ perspective: '1000px' }}>
                <TiltCard className="project-card glass-target" max={10}>
                  <div className="project-num">{proj.id}</div>
                  <span className="project-role">{proj.role}</span>
                  <h2 className="project-title">{proj.title}</h2>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="tag-row">
                    {proj.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── SKILLS ── */}
        <section className="skills-section" id="skills">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-label">02 / SKILLS</span>
            <ScrambleSectionTitle text="TECHNICAL ARSENAL" />
          </motion.div>

          <motion.div
            className="skills-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerFast}
          >
            {skills.map((group, i) => (
              <motion.div key={group.category} className="skill-card glass-target" variants={popIn}>
                <h3 className="skill-category">{group.category}</h3>
                <ul className="skill-list">
                  {group.items.map(item => (
                    <li key={item} className="skill-item">
                      <span className="skill-bullet">▸</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── ABOUT / EDUCATION ── */}
        <section className="about" id="about">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-label">03 / ABOUT</span>
            <ScrambleSectionTitle text="BEHIND THE CODE" />
          </motion.div>

          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <p className="about-text">
                I'm a third-year Computer Science student at Egerton University, Njoro — passionate about engineering
                end-to-end software that actually solves real problems. From architecting fintech backends to designing
                campus network infrastructure, I thrive at the intersection of systems thinking and creative coding.
                When I'm not pushing commits, I'm competing at hackathons across Kenya.
              </p>
              {/* Stat counters */}
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-num">4+</span>
                  <span className="about-stat-label">Hackathons</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">3</span>
                  <span className="about-stat-label">Years CS</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">4</span>
                  <span className="about-stat-label">Projects</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">7+</span>
                  <span className="about-stat-label">Tech Stacks</span>
                </div>
              </div>
            </motion.div>

            <div className="education-stack">
              <motion.div
                className="edu-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="section-label">CURRENT</span>
                <h3 className="edu-name">EGERTON UNIVERSITY</h3>
                <p className="edu-degree">BSc. Computer Science &mdash; Year 3, Sem 2</p>
                <p className="edu-meta">Njoro, Kenya &nbsp;|&nbsp; 2023 – Present</p>
                <ul className="edu-courses">
                  <li>Systems Programming</li>
                  <li>Object-Oriented Programming</li>
                  <li>Probability &amp; Statistics</li>
                </ul>
              </motion.div>

              <motion.div
                className="edu-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.15 }}
              >
                <span className="section-label">SECONDARY</span>
                <h3 className="edu-name">MASENO SCHOOL</h3>
                <p className="edu-degree">Kenya Certificate of Secondary Education</p>
                <p className="edu-meta">Kisumu, Kenya &nbsp;|&nbsp; 2019 – 2022</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HACKATHONS LEADERBOARD ── */}
        <section className="hackathons-section" id="hackathons">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-label">04 / EVENTS</span>
            <h2 className="section-title">HACKATHONS &amp; SUMMITS</h2>
          </motion.div>

          {/* Leaderboard panel */}
          <motion.div
            className="lb-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            onViewportEnter={() => {}}
          >
            {/* Panel header */}
            <div className="lb-header">
              <div className="lb-header-left">
                <span className="lb-icon">🏆</span>
                <span className="lb-title">SCOREBOARD</span>
              </div>
              <div className="lb-header-right">
                <span className="lb-live-dot" />
                <span className="lb-live-label">LIVE</span>
                <span className="lb-season">SEASON 2025–26</span>
              </div>
            </div>

            {/* Column labels */}
            <div className="lb-col-labels">
              <span className="lb-col-rank">RANK</span>
              <span className="lb-col-spacer" />
              <span className="lb-col-event">EVENT</span>
              <span className="lb-col-score-label">SCORE</span>
            </div>

            {/* Rows */}
            <LbRows hackathons={hackathons} />

            {/* Footer bar */}
            <div className="lb-footer">
              <span className="lb-footer-tip">✦ CLICK A ROW TO EARN XP</span>
              <span className="lb-footer-stat">{hackathons.length} EVENTS COMPETED</span>
            </div>
          </motion.div>
        </section>

        {/* ── BOSS FIGHT CONTACT ── */}
        <footer className="boss-footer" id="contact">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={wildSlam}
          >
            <span className="section-label">05 / FINAL STAGE</span>
            <ScrambleSectionTitle text="⚔ BOSS ENCOUNTER" />
          </motion.div>

          <motion.p
            className="boss-tagline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            A WILD HIRING MANAGER APPEARS — CHOOSE YOUR MOVE
          </motion.p>

          {/* Arena */}
          <motion.div
            className="boss-arena"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Left fighter */}
            <motion.div className="fighter fighter--enemy" variants={flipInL}>
              <div className="fighter-avatar fighter-avatar--enemy">?</div>
              <p className="fighter-name">HIRING MGR</p>
              <div className="fighter-hp-wrap">
                <div className="fighter-hp-label">HP</div>
                <div className="fighter-hp-track">
                  <div className="fighter-hp-fill fighter-hp--enemy" />
                </div>
              </div>
              <p className="fighter-type">LV.99 RECRUITER</p>
            </motion.div>

            {/* VS badge */}
            <motion.div
              className="boss-vs"
              variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 14 } } }}
            >
              VS
            </motion.div>

            {/* Right fighter — player */}
            <motion.div className="fighter fighter--player" variants={flipInR}>
              <div className="fighter-avatar fighter-avatar--player">D.</div>
              <p className="fighter-name">DONALD OWIDO</p>
              <div className="fighter-hp-wrap">
                <div className="fighter-hp-label">HP</div>
                <div className="fighter-hp-track">
                  <div className="fighter-hp-fill fighter-hp--player" />
                </div>
              </div>
              <p className="fighter-type">LV.21 FULL-STACK</p>
            </motion.div>
          </motion.div>

          {/* Battle log */}
          <motion.div
            className="boss-log"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <span className="boss-log-cursor" />
            <span className="boss-log-text">▶ WHAT WILL DONALD DO?</span>
          </motion.div>

          {/* Move cards */}
          <motion.div
            className="boss-moves"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.a
              href="mailto:doncool933@gmail.com"
              className="boss-move"
              variants={wildSlam}
              whileHover={{ scale: 1.06, y: -6 }}
            >
              <span className="boss-move-icon">✉</span>
              <span className="boss-move-name">EMAIL</span>
              <span className="boss-move-type">DIRECT CONTACT</span>
            </motion.a>
            <motion.a
              href="https://github.com/dowido"
              target="_blank"
              rel="noopener noreferrer"
              className="boss-move"
              variants={wildSlam}
              whileHover={{ scale: 1.06, y: -6 }}
            >
              <span className="boss-move-icon">⌨</span>
              <span className="boss-move-name">GITHUB</span>
              <span className="boss-move-type">INSPECT CODE</span>
            </motion.a>
            <motion.a
              href="tel:+254728016048"
              className="boss-move"
              variants={wildSlam}
              whileHover={{ scale: 1.06, y: -6 }}
            >
              <span className="boss-move-icon">☎</span>
              <span className="boss-move-name">CALL</span>
              <span className="boss-move-type">VOICE ATTACK</span>
            </motion.a>
          </motion.div>

          <motion.p
            className="footer-credit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            DONALD AURTHUR OWIDO &nbsp;/// &nbsp;NAKURU, KENYA &nbsp;/// &nbsp;{new Date().getFullYear()}
          </motion.p>
        </footer>
      </div>
    </>
  );
}
