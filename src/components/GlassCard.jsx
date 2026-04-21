import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0, style = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel ${className}`}
      style={{
        padding: '2rem',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
