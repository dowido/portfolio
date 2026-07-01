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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
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
  { name: "HACKERTON AI SUMMIT", date: "MARCH 2026" },
  { name: "NJORO HACKATHON", date: "FEB 2026" },
  { name: "VERCEL BUILDATHON NAKURU", date: "DEC 2025" },
  { name: "AI HACKATHON KENYA", date: "NOV 2025" },
];

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
        {/* ── NAV ── */}
        <nav>
          <div className="logo">D.</div>
          <div className="nav-links">
            <a href="#work">WORK</a>
            <a href="#skills">SKILLS</a>
            <a href="#about">ABOUT</a>
            <a href="#hackathons">EVENTS</a>
            <a href="#contact">CONTACT</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
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
          >
            DONALD AURTHUR OWIDO &nbsp;///&nbsp; NJORO, NAKURU COUNTY, KENYA
          </motion.p>
          <motion.h1 
            className="hero-text-huge"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            DONALD
          </motion.h1>
          <motion.h1 
            className="hero-text-huge"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            OWIDO
          </motion.h1>
          
          <motion.div 
             className="hero-sub"
             initial="hidden"
             animate="visible"
             variants={fadeInUp}
             transition={{ delay: 0.4 }}
          >
              <p className="hero-desc">
                Driven CS student specializing in full-stack web &amp; native Android development.
                I architect robust backends, design responsive React interfaces, and engineer
                mobile solutions from the ground up with Jetpack Compose.
              </p>
              <div className="hero-cta-row">
                <a href="#work" className="brutal-btn brutal-btn--primary">VIEW WORK ///</a>
                <a href="mailto:doncool933@gmail.com" className="brutal-btn brutal-btn--ghost glass-target">HIRE ME ///</a>
              </div>
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
            <h2 className="section-title">SELECTED WORK</h2>
          </motion.div>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {projects.map((proj, idx) => (
              <motion.div 
                key={proj.id}
                className="project-card glass-target"
                variants={fadeInUp}
              >
                <div className="project-num">{proj.id}</div>
                <span className="project-role">{proj.role}</span>
                <h2 className="project-title">{proj.title}</h2>
                <p className="project-desc">{proj.desc}</p>
                <div className="tag-row">
                  {proj.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
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
            <h2 className="section-title">TECHNICAL ARSENAL</h2>
          </motion.div>

          <motion.div
            className="skills-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {skills.map((group) => (
              <motion.div key={group.category} className="skill-card glass-target" variants={fadeInUp}>
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
            <h2 className="section-title">BEHIND THE CODE</h2>
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

        {/* ── HACKATHONS ── */}
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

          <motion.div
            className="hackathon-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {hackathons.map((h, i) => (
              <motion.div key={i} className="hackathon-row glass-target" variants={fadeInUp}>
                <span className="hackathon-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="hackathon-name">{h.name}</span>
                <span className="hackathon-date">{h.date}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CONTACT / FOOTER ── */}
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

          <motion.div
            className="contact-links"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.a 
              href="mailto:doncool933@gmail.com" 
              className="brutal-btn glass-target"
              variants={fadeInUp}
            >
              EMAIL ///
            </motion.a>
            <motion.a 
              href="https://github.com/dowido" 
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn glass-target"
              variants={fadeInUp}
            >
              GITHUB ///
            </motion.a>
            <motion.a 
              href="tel:+254728016048"
              className="brutal-btn glass-target"
              variants={fadeInUp}
            >
              CALL ///
            </motion.a>
          </motion.div>

          <motion.p
            className="footer-credit"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            DONALD AURTHUR OWIDO &nbsp;/// &nbsp;NAKURU, KENYA &nbsp;/// &nbsp;{new Date().getFullYear()}
          </motion.p>
        </footer>
      </div>
    </>
  );
}
