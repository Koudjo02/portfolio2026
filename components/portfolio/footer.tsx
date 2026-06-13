/**
 * ========================================
 * FOOTER COMPONENT - Pied de page
 * ========================================
 * 
 * Pied de page simple avec copyright et liens rapides.
 */

import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {currentYear} Portfolio. Tous droits réservés.
          </p>

          {/* Liens sociaux */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/koudjo02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/koudjo-samuel-adzogble-870a00336"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:samuel.adzogble@epitech.eu"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
