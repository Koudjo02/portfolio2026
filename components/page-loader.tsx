'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADER_CONFIG = {
  name: 'SAMUEL ADZOGBLE',
  subtitle: 'Développeur Fullstack',
  loadingDuration: 4000,
};

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // ref pour accéder à revealed dans les intervals sans closure stale
  const revealedRef = useRef<boolean[]>([]);

  const name = LOADER_CONFIG.name;

  // Init
  useEffect(() => {
    const initial = name.split('').map(c => c === ' ' ? ' ' : randomChar());
    setDisplayChars(initial);
    revealedRef.current = Array(name.length).fill(false);
  }, []);

  // Matrix canvas rain
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const ctx = canvas.getContext('2d')!;
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(0).map(() => Math.random() * -50);

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      drops.forEach((y, i) => {
        const char = randomChar();
        const b = Math.random();
        ctx.fillStyle = b > 0.95
          ? `rgba(180,255,180,${b})`
          : `rgba(0,${Math.floor(180 + b * 75)},${Math.floor(b * 60)},${0.4 + b * 0.6})`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        drops[i] += 1;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Shuffle + reveal via ref (pas de closure stale)
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayChars(
        name.split('').map((c, i) => {
          if (c === ' ') return ' ';
          if (revealedRef.current[i]) return c; // déjà révélé → lettre finale
          return randomChar();
        })
      );
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Progress + mise à jour de revealedRef
  useEffect(() => {
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const ratio = Math.min((now - startTime) / LOADER_CONFIG.loadingDuration, 1);
      const eased = ratio < 0.5 ? 4 * ratio * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 3) / 2;
      const p = Math.round(eased * 100);
      setProgress(p);

      // Calcul du nombre de caractères à révéler
      const nonSpaces = name.split('').filter(c => c !== ' ').length;
      const toReveal = Math.floor((p / 100) * nonSpaces);
      let count = 0;
      revealedRef.current = name.split('').map(c => {
        if (c === ' ') return false;
        count++;
        return count <= toReveal;
      });

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Tout révéler d'un coup à la fin
        revealedRef.current = name.split('').map(c => c !== ' ');
        setDisplayChars(name.split(''));
        setDone(true);
        setTimeout(() => setIsLoading(false), 900);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 overflow-hidden"
          style={{ background: '#000', fontFamily: "'Courier New', monospace" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Matrix canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Nom */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="font-black uppercase select-none text-center"
              style={{ fontSize: 'clamp(24px, 5vw, 48px)', letterSpacing: '0.2em' }}
            >
              {displayChars.map((c, i) => (
                <span
                  key={i}
                  style={{
                    color: revealedRef.current[i] ? '#fff' : '#00ff46',
                    opacity: revealedRef.current[i] ? 1 : 0.5,
                    textShadow: revealedRef.current[i]
                      ? '0 0 20px rgba(0,255,70,0.9), 0 0 40px rgba(0,255,70,0.4)'
                      : 'none',
                    display: 'inline-block',
                    width: c === ' ' ? '0.5em' : 'auto',
                  }}
                >
                  {c === ' ' ? '\u00A0' : c}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.div
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#00ff46' }}
              animate={{ opacity: done ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {LOADER_CONFIG.subtitle}
            </motion.div>
          </motion.div>

          {/* Barre de progression */}
          <div className="relative z-10 flex flex-col gap-2" style={{ width: 300 }}>
            <div className="flex justify-between items-center" style={{ fontFamily: 'monospace', fontSize: 12 }}>
              <span style={{ color: '#00ff46', fontSize: 14, fontWeight: 700 }}>
                {progress}%
              </span>
              <span style={{ color: done ? '#00ff46' : '#444' }}>
                {done ? '✓ Système prêt' : 'Décryptage en cours...'}
              </span>
            </div>
            <div style={{ height: 2, background: '#111', borderRadius: 1, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: '#00ff46',
                  borderRadius: 1,
                  boxShadow: '0 0 8px #00ff46',
                  transition: 'width 0.08s linear',
                }}
              />
            </div>
            <div className="flex justify-between" style={{ fontSize: 10, color: '#222', fontFamily: 'monospace' }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

