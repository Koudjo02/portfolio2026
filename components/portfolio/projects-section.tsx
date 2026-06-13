"use client";

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Folder, ArrowUpRight, X,
  Smartphone, Globe, Server, Sparkles, Code2, CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  details?: { role?: string; achievements: string[] };
  technologies: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'api';
  featured?: boolean;
  demoUrl?: string;
  codeUrl?: string;
  year: string;
}

const demoProjects: Project[] = [
  {
    id: '4',
    title: 'FreeAds',
    description: "Plateforme de petites annonces de particulier à particulier (type LeBonCoin) avec publication d'annonces, moteur de recherche filtré et espace utilisateur complet.",
    imageUrl: '/projects/freeads.png',
    details: {
      role: 'Développeur Fullstack',
      achievements: [
        "Implémentation du système de publication d'annonces avec téléversement et optimisation d'images (upload local).",
        "Création d'un moteur de recherche interne avec filtres dynamiques par prix, mots-clés et catégories en temps réel.",
        'Développement de l\'espace utilisateur pour gérer, modifier et passer ses annonces en mode "vendu".',
      ],
    },
    technologies: ['Laravel', 'MySQL', 'PHP', 'Blade'],
    category: 'fullstack',
    featured: true,
    year: '2026',
  },
  {
    id: '3',
    title: 'Post-it',
    description: "Application web interactive de type pense-bête — création, modification et suppression de notes en temps réel sur un tableau de bord épuré, avec persistance des données.",
    imageUrl: '/projects/postit.png',
    details: {
      role: 'Développeur Frontend',
      achievements: [
        "Développement d'une interface dynamique permettant l'ajout, la modification et la suppression de notes sans rechargement de la page.",
        "Gestion de la persistance des données via une API REST externe (base de données distante).",
        "Communication avec l'API du professeur pour synchroniser les données entre sessions.",
        "Optimisation de l'ergonomie et du design pour une expérience utilisateur fluide et réactive.",
      ],
    },
    technologies: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'REST API'],
    category: 'web',
    featured: true,
    year: '2026',
  },
  {
    id: '1',
    title: 'Yowl',
    description: "Plateforme d'avis et de commentaires en temps réel avec système de vote (upvote/downvote), commentaires imbriqués et gestion de catégories.",
    imageUrl: '/projects/yowl.png',
    details: {
      role: 'Développeur Fullstack',
      achievements: [
        "Mise en place de l'architecture MVC pour l'application.",
        "Développement du système d'évaluation dynamique (Upvote / Downvote).",
        'Gestion des commentaires imbriqués.',
        'Gestion des relations complexes en base de données pour lier les utilisateurs, les publications et leurs catégories.',
      ],
    },
    technologies: ['Laravel', 'MySQL', 'REST API', 'Git', 'MVC'],
    category: 'fullstack',
    featured: true,
    year: '2026',
  },
  {
    id: '2',
    title: 'Tikerama Clone',
    description: "Plateforme de réservation de concerts avec back-office d'administration, gestion des rôles Admin/User, authentification OAuth Google et affichage dynamique des événements.",
    imageUrl: '/projects/tikerama.png',
    details: {
      role: 'Développeur Backend',
      achievements: [
        "Conception et sécurisation de l'API d'authentification.",
        "Développement du Back-Office d'administration (gestion des utilisateurs, suppression, création).",
        'Attribution dynamique des droits avec un système de rôles Admin/User.',
        "Mapping et formatage des données d'événements pour l'affichage dynamique des vues.",
        "Intégration de l'authentification OAuth Google et gestion des sessions.",
      ],
    },
    technologies: ['NestJS', 'TypeScript', 'MongoDB', 'Mongoose', 'OAuth', 'Handlebars'],
    category: 'fullstack',
    featured: true,
    year: '2026',
  },
];

const CATEGORIES = [
  { id: 'all',       label: 'Tous',      icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'web',       label: 'Web',       icon: <Globe className="h-3.5 w-3.5" /> },
  { id: 'mobile',    label: 'Mobile',    icon: <Smartphone className="h-3.5 w-3.5" /> },
  { id: 'fullstack', label: 'Fullstack', icon: <Code2 className="h-3.5 w-3.5" /> },
];

const CAT_COLOR: Record<string, string> = {
  web:       'from-blue-500 to-cyan-500',
  mobile:    'from-orange-500 to-rose-500',
  fullstack: 'from-emerald-500 to-teal-500',
  api:       'from-violet-500 to-purple-500',
};

const CAT_ICON: Record<string, React.ReactNode> = {
  web:       <Globe className="h-4 w-4" />,
  mobile:    <Smartphone className="h-4 w-4" />,
  fullstack: <Code2 className="h-4 w-4" />,
};

function DetailPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay plein écran */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panneau latéral */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="fixed right-0 top-0 bottom-0 z-[9999] w-full max-w-md"
      >
        <div
          className="flex h-full w-full flex-col border-l border-white/10 shadow-2xl"
          style={{ backgroundColor: '#0d1117' }}
        >
          {/* Image */}
          <div className="relative h-52 shrink-0 overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${CAT_COLOR[project.category]}`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="pb-3 border-b border-white/10">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-white/40">
                {CAT_ICON[project.category]}
                <span className="capitalize">{project.category}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
              {project.details?.role && (
                <p className="mt-1 text-sm text-white/50">{project.details.role}</p>
              )}
            </div>

            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Description
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">{project.description}</p>
            </div>

            {project.details?.achievements && (
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  Réalisations
                </h3>
                <ul className="space-y-2.5">
                  {project.details.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Stack technique
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          {(project.demoUrl || project.codeUrl) && (
            <div className="shrink-0 border-t border-white/10 p-4 flex gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Voir le projet
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  Code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onClick={() => onSelect(project)}
      className="group flex flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div
        className={`relative h-40 ${
          !project.imageUrl ? `bg-gradient-to-br ${CAT_COLOR[project.category]}` : 'bg-muted'
        } flex items-center justify-center overflow-hidden`}
      >
        {project.imageUrl ? (
          <>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg">
              <span className="text-2xl font-bold text-white">{project.title.charAt(0)}</span>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
          {CAT_ICON[project.category]}
          <span className="capitalize">{project.category}</span>
        </div>
        <div className="absolute top-3 right-3 z-10 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 text-xs font-mono text-white/80">
          {project.year}
        </div>
        {project.featured && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-primary/80 px-2.5 py-1 text-xs font-medium text-white">
            <Sparkles className="h-3 w-3" />
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary/60 px-2 py-0.5 text-xs font-medium text-foreground/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md bg-secondary/60 px-2 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        {project.codeUrl && (
          <div className="flex gap-2 pt-1">
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Code
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered =
    active === 'all' ? demoProjects : demoProjects.filter((p) => p.category === active);

  return (
    <>
      <section ref={ref} id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Folder className="h-4 w-4" />
              Portfolio
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Projets{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Récents
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Une sélection de mes réalisations en développement web et mobile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  active === cat.id
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onSelect={setSelected}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a
            href="/MonCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/40 px-8 py-4 text-lg font-semibold text-foreground hover:bg-emerald-400/20 hover:border-emerald-950 hover:text-emerald-200 transition-all duration-200"
            >
            Cliquez ici pour voir mon CV
  <ArrowUpRight className="h-4 w-4" />
</a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <DetailPanel
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

