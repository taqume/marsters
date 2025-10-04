/**
 * Represents the difficulty level of an article summary
 */
export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

/**
 * Supported languages in the application
 */
export enum Language {
  EN = 'en',
  TR = 'tr',
}

/**
 * Article content at different difficulty levels
 */
export interface ArticleContent {
  beginner: string;
  intermediate: string;
  advanced: string;
}

/**
 * Translations for an article
 */
export interface ArticleTranslations {
  tr: {
    title: string;
    author: string;
    category: string;
    content: ArticleContent;
  };
}

/**
 * Main Article model
 * Represents a single NASA biology article
 */
export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  coverColor: string;
  content: ArticleContent;
  translations: ArticleTranslations;
}

/**
 * Reading history entry for tracking user progress
 */
export interface ReadingHistoryEntry {
  articleId: number;
  lastReadDate: string;
  timeSpentSeconds: number;
  lastDifficultyLevel: DifficultyLevel;
  progress: number; // 0-100 percentage
}

/**
 * User statistics
 */
export interface UserStatistics {
  totalArticlesRead: number;
  totalTimeSpentSeconds: number;
  favoriteCount: number;
  lastReadDate: string | null;
  articlesReadByDifficulty: {
    [key in DifficultyLevel]: number;
  };
}

/**
 * Theme mode
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}
