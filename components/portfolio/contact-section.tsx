'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, Github, Linkedin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const contactInfo = {
  email: 'samuel.adzogble@epitech.eu',
  location: "Abidjan, Côte d'Ivoire",
  github: 'https://github.com/Koudjo02',
  linkedin: 'https://www.linkedin.com/in/koudjo-samuel-adzogble-870a00336/',
};

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData(initialFormData);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  });

  return (
    <section ref={ref} id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Lueurs d'ambiance */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Mail className="h-4 w-4" />
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Travaillons{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ensemble
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Un projet en tête ? Une opportunité à partager ? Je réponds généralement sous 24h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Colonne gauche : infos ── */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col gap-6">

            <p className="text-muted-foreground leading-relaxed">
              Je suis disponible pour des missions freelance, des collaborations ou des opportunités full-time.
              N&apos;hésitez pas à m&apos;écrire, je serai ravi d&apos;échanger.
            </p>

            {/* Cartes infos */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  label: 'Email',
                  value: contactInfo.email,
                  href: `mailto:${contactInfo.email}`,
                },
                {
                  icon: <MapPin className="h-5 w-5" />,
                  label: 'Localisation',
                  value: contactInfo.location,
                  href: null,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
                Retrouvez-moi sur
              </p>
              <div className="flex gap-3">
                {[
                  { href: contactInfo.github, icon: <GithubIcon className="h-5 w-5" />, label: 'GitHub' },
                  { href: contactInfo.linkedin, icon: <LinkedinIcon className="h-5 w-5" />, label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border hover:bg-card transition-all duration-200"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Disponibilité */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-sm text-emerald-400 font-medium">
                Disponible pour de nouvelles opportunités
              </p>
            </motion.div>
          </motion.div>

          {/* ── Colonne droite : formulaire ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-3 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nom */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
              </div>

              {/* Sujet */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Sujet
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  required
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre demande..."
                  required
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition"
                />
              </div>

              {/* Statut */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-sm text-emerald-400"
                >
                  ✓ Message envoyé avec succès ! Je vous répondrai bientôt.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400"
                >
                  Une erreur s&apos;est produite. Veuillez réessayer.
                </motion.p>
              )}

              {/* Bouton */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

