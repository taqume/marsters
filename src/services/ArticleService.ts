import { Article, Language } from '@models/Article';
import articlesData from '@data/articles.json';

/**
 * Article Service
 * Handles article data loading and management following SOLID principles
 * - Single Responsibility: Only handles article data operations
 * - Open/Closed: Can be extended without modification
 */
export class ArticleService {
  private articles: Article[];

  constructor() {
    this.articles = articlesData as Article[];
  }

  /**
   * Get all articles
   */
  getAllArticles(): Article[] {
    return this.articles;
  }

  /**
   * Get article by ID
   */
  getArticleById(id: number): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  /**
   * Search articles by title
   */
  searchArticles(query: string, language: Language = Language.EN): Article[] {
    if (!query.trim()) {
      return this.articles;
    }

    const lowerQuery = query.toLowerCase();
    
    return this.articles.filter((article) => {
      if (language === Language.TR && article.translations?.tr) {
        return article.translations.tr.title.toLowerCase().includes(lowerQuery);
      }
      return article.title.toLowerCase().includes(lowerQuery);
    });
  }

  /**
   * Get articles by IDs (for favorites)
   */
  getArticlesByIds(ids: number[]): Article[] {
    return this.articles.filter((article) => ids.includes(article.id));
  }

  /**
   * Get localized article title
   */
  getLocalizedTitle(article: Article, language: Language): string {
    if (language === Language.TR && article.translations?.tr) {
      return article.translations.tr.title;
    }
    return article.title;
  }

  /**
   * Get localized article content
   */
  getLocalizedContent(article: Article, language: Language, difficulty: string): string {
    const content = language === Language.TR && article.translations?.tr
      ? article.translations.tr.content
      : article.content;

    return (content as any)[difficulty] || content.original;
  }
}

// Singleton instance
export const articleService = new ArticleService();
