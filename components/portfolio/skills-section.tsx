"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Server, Smartphone, Database, Terminal,
  Layers, Cpu, Globe,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  color: string;       
  bg: string;          
  skills: Skill[];
}


const categories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <Code2 className="h-5 w-5" />,
    color: 'text-blue-400 ring-blue-500/30',
    bg: 'bg-blue-500/10',
    skills: [
      { name: 'React',  icon: <Layers className="h-4 w-4" /> },
      { name: 'TypeScript',       icon: <Terminal className="h-4 w-4" /> },
      { name: 'Tailwind CSS',     icon: <Code2 className="h-4 w-4" /> },
      { name: 'Vue.js',    icon: <Code2 className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Backend',
    icon: <Server className="h-5 w-5" />,
    color: 'text-emerald-400 ring-emerald-500/30',
    bg: 'bg-emerald-500/10',
    skills: [
      { name: 'Laravel',    icon: <Server className="h-4 w-4" /> },
      { name: 'NestJS',            icon: <Server className="h-4 w-4" /> },
      { name: 'API REST', icon: <Server className="h-4 w-4" /> },
    ],
  },
  
  {
    name: 'Base de données',
    icon: <Database className="h-5 w-5" />,
    color: 'text-rose-400 ring-rose-500/30',
    bg: 'bg-rose-500/10',
    skills: [
      { name: 'MongoDB ',    icon: <Database className="h-4 w-4" /> },
      { name: ' mysql', icon: <Database className="h-4 w-4" /> },
      { name: ' postgresql', icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Outils',
    icon: <Terminal className="h-5 w-5" />,
    color: 'text-violet-400 ring-violet-500/30',
    bg: 'bg-violet-500/10',
    skills: [
      { name: 'Git / GitHub', icon: <Terminal className="h-4 w-4" /> },
      { name: 'Linux / Bash', icon: <Terminal className="h-4 w-4" /> },
      { name: 'CI/CD', icon: <Terminal className="h-4 w-4" /> },
    ],
  },
];

// ─── Carte catégorie ──────────────────────────────────────

function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-5 hover:border-border transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-xl ${cat.bg} ${cat.color} ring-1 ring-inset`}>
          {cat.icon}
        </div>
        <span className="font-semibold text-foreground">{cat.name}</span>
      </div>

      {/* Grille d'icônes */}
      <div className="grid grid-cols-2 gap-2">
        {cat.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors duration-200 group"
          >
            <span className={`shrink-0 ${cat.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
              {skill.icon}
            </span>
            <span className="text-xs font-medium text-foreground/80 truncate">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section principale ───────────────────────────────────

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Halos de fond */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Cpu className="h-4 w-4" />
            Stack Technique
          </div>

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Compétences &amp;{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Expertise en développement web et mobile avec les technologies modernes.
          </p>
        </motion.div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

