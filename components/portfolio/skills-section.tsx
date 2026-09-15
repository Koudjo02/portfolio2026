"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Database, Terminal, Cpu } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';
import { translations } from '@/components/translations';

interface Skill { name: string; icon: React.ReactNode; }
interface SkillCategory { key: string; icon: React.ReactNode; color: string; bg: string; skills: Skill[]; }

const categories: SkillCategory[] = [
  {
    key: 'frontend',
    icon: <Code2 className="h-5 w-5" />,
    color: 'text-blue-400 ring-blue-500/30',
    bg: 'bg-blue-500/10',
    skills: [
      { name: 'Next.JS', icon: <Terminal className="h-4 w-4" /> },
      { name: 'Vue.js', icon: <Code2 className="h-4 w-4" /> },
      { name: 'React', icon: <Code2 className="h-4 w-4" /> },
      { name: 'Angular', icon: <Code2 className="h-4 w-4" /> },
    ],
  },
  {
    key: 'backend',
    icon: <Server className="h-5 w-5" />,
    color: 'text-emerald-400 ring-emerald-500/30',
    bg: 'bg-emerald-500/10',
    skills: [
      { name: 'Laravel', icon: <Server className="h-4 w-4" /> },
      { name: 'NestJS', icon: <Server className="h-4 w-4" /> },
      { name: 'API REST', icon: <Server className="h-4 w-4" /> },
    ],
  },
  {
    key: 'database',
    icon: <Database className="h-5 w-5" />,
    color: 'text-rose-400 ring-rose-500/30',
    bg: 'bg-rose-500/10',
    skills: [
      { name: 'MongoDB', icon: <Database className="h-4 w-4" /> },
      { name: 'MySQL', icon: <Database className="h-4 w-4" /> },
      { name: 'PostgreSQL', icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    key: 'tools',
    icon: <Terminal className="h-5 w-5" />,
    color: 'text-violet-400 ring-violet-500/30',
    bg: 'bg-violet-500/10',
    skills: [
      { name: 'Git / GitHub', icon: <Terminal className="h-4 w-4" /> },
      { name: 'Linux / Bash', icon: <Terminal className="h-4 w-4" /> },
      { name: 'CI/CD', icon: <Terminal className="h-4 w-4" /> },
    ],
  },
  {
    key: 'languages',
    icon: <Cpu className="h-5 w-5" />,
    color: 'text-amber-400 ring-amber-500/30',
    bg: 'bg-amber-500/10',
    skills: [
      { name: 'JavaScript', icon: <Code2 className="h-4 w-4" /> },
      { name: 'TypeScript', icon: <Code2 className="h-4 w-4" /> },
      { name: 'Python', icon: <Server className="h-4 w-4" /> },
    ],
  },
];

function CategoryCard({ cat, index, name }: { cat: SkillCategory; index: number; name: string }) {
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
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-xl ${cat.bg} ${cat.color} ring-1 ring-inset`}>
          {cat.icon}
        </div>
        <span className="font-semibold text-foreground">{name}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {cat.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors duration-200 group"
          >
            <span className={`shrink-0 ${cat.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
              {skill.icon}
            </span>
            <span className="text-xs font-medium text-foreground/80 truncate">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const { lang } = useLang();
  const t = translations[lang].skills;

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Cpu className="h-4 w-4" />
            {t.badge}
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {t.title}{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t.highlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              index={i}
              name={(t.categories as Record<string, string>)[cat.key]}            />
          ))}
        </div>
      </div>
    </section>
  );
}

