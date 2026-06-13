/**
 * ========================================
 * TYPES - Définitions TypeScript partagées
 * ========================================
 * 
 * Ce fichier contient toutes les interfaces et types TypeScript
 * utilisés dans l'application frontend. Ces types correspondent
 * aux entités définies côté backend NestJS.
 */

/**
 * Enum des catégories de compétences.
 * Doit correspondre à l'enum SkillCategory du backend.
 */
export enum SkillCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',       
  FULLSTACK = 'fullstack',   
  MOBILE = 'mobile',         
  DATABASE = 'database',     
}

/**
 * Interface représentant une compétence.
 * Structure identique à l'entité Skill du backend.
 */
export interface Skill {
  /** Identifiant unique (UUID) */
  id: string;
  
  /** Nom de la compétence */
  name: string;
  
  /** Catégorie pour le filtrage */
  category: SkillCategory;
  
  /** URL ou nom de l'icône (optionnel) */
  icon?: string;
  
  /** Niveau de maîtrise 1-5 (optionnel) */
  level?: number;
  
  /** Ordre d'affichage */
  order: number;
  
  /** Date de création */
  createdAt: string;
  
  /** Date de dernière modification */
  updatedAt: string;
}

/**
 * Interface pour la création d'une compétence.
 * Correspond au CreateSkillDto du backend.
 */
export interface CreateSkillData {
  name: string;
  category: SkillCategory;
  icon?: string;
  level?: number;
  order?: number;
}

/**
 * Interface pour la mise à jour d'une compétence.
 * Tous les champs sont optionnels (mise à jour partielle).
 */
export interface UpdateSkillData {
  name?: string;
  category?: SkillCategory;
  icon?: string;
  level?: number;
  order?: number;
}

/**
 * Interface pour les options de catégorie.
 * Utilisée dans les menus déroulants.
 */
export interface CategoryOption {
  value: SkillCategory;
  label: string;
}

/**
 * Mapping des catégories vers leurs labels français.
 * Utilisé pour l'affichage dans l'interface.
 */
export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  [SkillCategory.FRONTEND]: 'Frontend',
  [SkillCategory.BACKEND]: 'Backend',
  [SkillCategory.FULLSTACK]: 'Fullstack',
  [SkillCategory.MOBILE]: 'Mobile',
  [SkillCategory.DATABASE]: 'Base de données',
};

/**
 * Couleurs associées à chaque catégorie.
 * Utilisées pour les badges et indicateurs visuels.
 */
export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  [SkillCategory.FRONTEND]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [SkillCategory.BACKEND]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [SkillCategory.FULLSTACK]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [SkillCategory.MOBILE]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  [SkillCategory.DATABASE]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
};
