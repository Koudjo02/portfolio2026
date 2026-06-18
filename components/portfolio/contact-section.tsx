'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { useLang } from '@/components/LanguageContext';
import { translations } from '@/components/translations';

const contactInfo = {
  email: 'samuel.adzogble@epitech.eu',
  location: "Abidjan, Côte d'Ivoire",
  whatsapp: '+2250565568733',
  github: 'https://github.com/Koudjo02',
  linkedin: 'https://www.linkedin.com/in/koudjo-samuel-adzogble-870a00336/',
};

export function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  });

  const actions = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      label: 'WhatsApp',
      description: t.whatsapp,
      href: `https://wa.me/${contactInfo.whatsapp}`,
      className: 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/20',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: 'Email',
      description: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      className: 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20',
    },
    {
      icon: <GithubIcon className="h-6 w-6" />,
      label: 'GitHub',
      description: t.github,
      href: contactInfo.github,
      className: 'border border-border/50 bg-card/50 hover:bg-card hover:border-border text-foreground',
    },
    {
      icon: <LinkedinIcon className="h-6 w-6" />,
      label: 'LinkedIn',
      description: t.linkedin,
      href: contactInfo.linkedin,
      className: 'border border-border/50 bg-card/50 hover:bg-card hover:border-border text-foreground',
    },
  ];

  return (
    <section ref={ref} id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...fadeUp(0)} className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Mail className="h-4 w-4" />{t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t.title}{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{t.highlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col gap-6">
            <p className="text-muted-foreground leading-relaxed">{t.description}</p>

            <div className="flex flex-col gap-3">
              {[
                { icon: <Mail className="h-5 w-5" />, label: t.email, value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                { icon: <MapPin className="h-5 w-5" />, label: t.location, value: contactInfo.location, href: null },
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
                      <a href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block">{item.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-sm text-emerald-400 font-medium">{t.available}</p>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="lg:col-span-3 flex flex-col justify-center gap-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{t.via}</p>
            {actions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 backdrop-blur-sm ${action.className}`}
              >
                <div className="shrink-0">{action.icon}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs opacity-75 truncate">{action.description}</p>
                </div>
                <svg className="ml-auto h-4 w-4 opacity-50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

