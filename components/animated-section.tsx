'use client';

/**
 * ========================================
 * ANIMATED SECTION - Wrapper d'animation
 * ========================================
 * 
 * Ce composant enveloppe les sections pour leur
 * ajouter des animations d'entrée au scroll.
 * Utilise Framer Motion avec intersection observer.
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

/**
 * Wrapper qui anime ses enfants lors de l'entrée dans le viewport
 * @param children - Contenu à animer
 * @param className - Classes CSS additionnelles
 * @param delay - Délai avant l'animation (en secondes)
 * @param direction - Direction de l'animation d'entrée
 */
export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  // Définit le décalage initial selon la direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { y: 0, x: 50 };
      case 'right': return { y: 0, x: -50 };
      case 'none': return { y: 0, x: 0 };
    }
  };
  
  const initialPosition = getInitialPosition();
  
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: initialPosition.y,
        x: initialPosition.x
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0
      }}
      viewport={{ 
        once: true, // Animation une seule fois
        margin: '-100px' // Déclenche 100px avant d'entrer dans le viewport
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Courbe d'accélération personnalisée
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animation de texte lettre par lettre
 */
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const words = text.split(' ');
  
  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: 'easeOut'
              }}
            >
              {char}
            </motion.span>
          ))}
          {/* Espace entre les mots */}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Animation de stagger pour les listes d'éléments
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item enfant pour StaggerContainer
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
