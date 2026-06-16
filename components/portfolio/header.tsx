'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
  download?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Accueil',      href: '#hero' },
  { label: 'Compétences',  href: '#skills' },
  { label: 'Projets',      href: '#projects' },
  { label: 'Contact',      href: '#contact' },
  { label: 'Jeux',         href: '#game' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || isMenuOpen
            ? 'rgba(13,17,23,0.95)'
            : 'rgba(13,17,23,0.6)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-[#1D9E75] transition-colors z-50 relative"
            >
              Portfolio
            </Link>

            {/* Nav desktop */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={link.download ? undefined : (e) => handleNavClick(e, link.href)}
                  download={link.download ? 'MonCV.pdf' : undefined}
                  target={link.download ? '_blank' : undefined}
                  rel={link.download ? 'noopener noreferrer' : undefined}
                  className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-px bg-[#1D9E75] transition-all duration-300 group-hover:w-full"
                  />
                </a>
              ))}
            </div>

            {/* Bouton hamburger animé */}
            <button
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <motion.span
                animate={isMenuOpen
                  ? { rotate: 45, y: 7, width: '24px' }
                  : { rotate: 0, y: 0, width: '24px' }
                }
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  display: 'block',
                  height: '2px',
                  background: isMenuOpen ? '#1D9E75' : 'white',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                }}
              />
              <motion.span
                animate={isMenuOpen
                  ? { opacity: 0, x: -8 }
                  : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.2 }}
                style={{
                  display: 'block',
                  height: '2px',
                  width: '16px',
                  background: 'white',
                  borderRadius: '2px',
                  alignSelf: 'flex-end',
                  marginRight: '8px',
                }}
              />
              <motion.span
                animate={isMenuOpen
                  ? { rotate: -45, y: -7, width: '24px' }
                  : { rotate: 0, y: 0, width: '24px' }
                }
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  display: 'block',
                  height: '2px',
                  background: isMenuOpen ? '#1D9E75' : 'white',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: '#0d1117' }}
          >
            {/* Particules déco */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="absolute rounded-full"
                  style={{
                    width: `${80 + i * 40}px`,
                    height: `${80 + i * 40}px`,
                    border: '1px solid #1D9E75',
                    left: `${10 + i * 12}%`,
                    top: `${15 + i * 10}%`,
                  }}
                />
              ))}
            </div>

            {/* Liens */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={link.download ? undefined : (e) => handleNavClick(e, link.href)}
                    download={link.download ? 'MonCV.pdf' : undefined}
                    target={link.download ? '_blank' : undefined}
                    rel={link.download ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 px-8 py-4 text-3xl font-bold text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span
                      className="text-sm font-mono text-[#1D9E75] w-6 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      0{i + 1}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer du menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pb-10 flex justify-center"
            >
              <p className="text-gray-600 text-xs font-mono">samuel.adzogble@epitech.eu</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

