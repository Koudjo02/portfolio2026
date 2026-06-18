'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Code, Smartphone, Globe, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { MatrixRain } from '../MatrixRain';

const PROFILE = {
  name: 'SAMUEL K. ADZOGBLE',
  titles: ['Développeur Fullstack', 'Web & Mobile'],
  tagline: 'Je crée des applications web modernes et performantes.',
  description: 'Passionné par le développement web, je conçois des solutions élégantes avec Laravel,React, Nest.js, et Vue.js. Mon objectif est de transformer vos idées en produits digitaux qui marqueront les esprits.',
  socialLinks: {
    github: 'https://github.com/Koudjo02',
    linkedin: 'https://www.linkedin.com/in/koudjo-samuel-adzogble-870a00336',
    email: 'samuel.adzogble@epitech.eu',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const techIconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

export function HeroSection() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = PROFILE.titles[currentTitleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % PROFILE.titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden"
    >
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Icônes tech flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 text-primary/10"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code size={60} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-20 text-primary/10"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Smartphone size={50} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 text-primary/10"
          animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Globe size={70} />
        </motion.div>
      </div>

      <motion.div
        className="mx-auto max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Salutation animée */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <motion.div
            className="h-px bg-primary"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <p className="text-primary font-mono text-sm">Bonjour, je suis</p>
        </motion.div>

        {/* Nom principal */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 text-balance"
        >
          <span className="inline-block">
            {PROFILE.name.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Titre professionnel avec effet machine à écrire */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-muted-foreground flex items-center gap-1">
            <span className="text-primary">&lt;</span>
            <span className="min-w-[300px]">
              {displayText}
              <motion.span
                className="inline-block w-0.5 h-8 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </span>
            <span className="text-primary">/&gt;</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
        >
          {PROFILE.description}
        </motion.p>

        {/* Boutons CTA */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="group">
              <a href="#projects" className="flex items-center gap-2">
                Voir mes projets
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" asChild className="group">
              <a href="#contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Me contacter
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/MonCV.pdf"
              download="MonCV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-input bg-background text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              <Download className="h-4 w-4" />
              Télécharger mon CV
            </a>
          </motion.div>
        </motion.div>

        {/* Liens réseaux sociaux */}
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          {[
            { href: 'https://github.com/Koudjo02/', Icon: GithubIcon, label: 'GitHub', isEmail: false },
            { href: 'https://www.linkedin.com/in/koudjo-samuel-adzogble-870a00336', Icon: LinkedinIcon, label: 'LinkedIn', isEmail: false },
            { href: 'mailto:samuel.adzogble@epitech.eu', Icon: Mail, label: 'Email', isEmail: true },
          ].map(({ href, Icon, label, isEmail }, i) => (
            <motion.a
              key={label}
              href={href}
              target={isEmail ? undefined : '_blank'}
              rel={isEmail ? undefined : 'noopener noreferrer'}
              className="text-muted-foreground hover:text-primary transition-colors relative group"
              aria-label={label}
              variants={techIconVariants}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              custom={i}
            >
              <Icon className="h-6 w-6" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-foreground text-background px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.a
            href="#skills"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-mono">Scroll</span>
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

