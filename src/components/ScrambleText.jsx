import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SCRAMBLE_DURATION = 700; // ms

/**
 * Renders text that scrambles with random characters when `trigger` becomes true,
 * then resolves back to the real `text` over `SCRAMBLE_DURATION` ms.
 *
 * Usage:
 *   <ScrambleText text="SELECTED WORK" trigger={isInView} />
 */
export default function ScrambleText({ text, trigger, className = '', tag: Tag = 'span' }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();
    const letters = text.split('');

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
      // Number of characters that have "locked in" from the left
      const locked = Math.floor(progress * letters.length);

      const next = letters.map((char, i) => {
        if (char === ' ') return ' ';
        if (i < locked) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      setDisplay(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, text]);

  return <Tag className={className}>{display}</Tag>;
}
