'use client';

import { useEffect, useRef } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const chars = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16; // un peu plus grand → moins de colonnes
    const columns = Math.floor(canvas.width / fontSize / 2); // moitié moins de colonnes
    const drops: number[] = Array(columns).fill(1);

    let lastTime = 0;
    const frameInterval = 100; // 100ms entre chaque frame au lieu de 50ms
    let animationId: number;

    const draw = (time: number) => {
      animationId = requestAnimationFrame(draw);

      if (time - lastTime < frameInterval) return;
      lastTime = time;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 70, 0.45)';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize * 2, y * fontSize); // espacement x2 entre colonnes
        if (y * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    animationId = requestAnimationFrame(draw);

    // Pause l'animation quand l'onglet n'est pas visible (économise les ressources)
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setSize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.12,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

