/**
 * ========================================
 * PAGE D'ACCUEIL - Portfolio Public
 * ========================================
 * 
 * Page principale du portfolio accessible au public.
 * Contient toutes les sections: Hero, Compétences, Projets, Contact.
 * 
 * Architecture:
 * - Server Component pour le SEO
 * - Sections importées comme composants séparés
 * - Navigation sticky en haut de page
 * - Arrière-plan 3D et animation de chargement
 */

import { Header } from '@/components/portfolio/header';
import { HeroSection } from '@/components/portfolio/hero-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { Footer } from '@/components/portfolio/footer';
import { HomePageClient } from '@/components/home-page-client';
import MemoryGame from '@/components/MemoryGame';
import { AboutSection } from '@/components/portfolio/about-section';



/**
 * Page d'accueil du portfolio.
 * Assemble toutes les sections dans un ordre logique.
 */
export default function HomePage() {
  return (
    <HomePageClient>
      {/* Navigation fixe */}
      <Header />

      {/* Contenu principal */}
      <main className="min-h-screen">
        {/* Section Hero - Présentation personnelle */}
        <HeroSection />

        {/* Section Compétences - Technologies maîtrisées */}
        <SkillsSection />

        {/* Section Projets - Réalisations */}
        <ProjectsSection />

        {/* Section À propos - Mon parcours et vision */}
        <AboutSection />

        {/* Section Jeux - Mini-jeu de mémoire */}
          <MemoryGame />
          
        {/* Section Contact - Formulaire et informations */}
        <ContactSection />
        
      </main>

      {/* Pied de page */}
      <Footer />
    </HomePageClient>
  );
}
