'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, GraduationCap, Target, Briefcase } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';
import { translations } from '@/components/translations';

interface Step {
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  title: string;
  text: string;
}

function StepCard({ step }: { step: Step }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-5 hover:border-border transition-colors duration-300"
    >
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} ${step.color} border ${step.border}`}>
        {step.icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const { lang } = useLang();
  const t = translations[lang].about;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, margin: '-80px' });

  const steps: Step[] = [
    { icon: <User className="h-5 w-5" />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', title: t.steps.spark.title, text: t.steps.spark.text },
    { icon: <GraduationCap className="h-5 w-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', title: t.steps.studies.title, text: t.steps.studies.text },
    { icon: <Briefcase className="h-5 w-5" />, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', title: t.steps.epitech.title, text: t.steps.epitech.text },
    { icon: <Target className="h-5 w-5" />, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', title: t.steps.vision.title, text: t.steps.vision.text },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Lueurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-2/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <User className="h-4 w-4" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t.title}{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t.highlight}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Photo + infos rapides */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, y: 24 }}
            animate={photoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col items-center gap-6 lg:sticky lg:top-24"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-primary/30 blur-sm opacity-60" />
              <img
                src="/PP.png"
                alt="Samuel K. Adzogble"
                className="relative w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-2xl border-2 border-primary/30"
              />
              {/* Badge disponible */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-emerald-400">{t.available}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4">
              {t.stats.map((stat: { value: string; label: string }) => (
                <div key={stat.label} className="rounded-xl border border-border/50 bg-card/40 px-4 py-3 text-center backdrop-blur-sm">
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline parcours â€” chaque bloc s'anime indÃ©pendamment au scroll */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {steps.map((step) => (
              <StepCard key={step.title} step={step} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

