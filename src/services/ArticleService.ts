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
   * Search articles by title and content (beginner + advanced)
   */
  searchArticlesWithContent(query: string, language: Language = Language.EN): Article[] {
    if (!query.trim()) {
      return this.articles;
    }

    const lowerQuery = query.toLowerCase();
    
    return this.articles.filter((article) => {
      // Search in title
      let titleMatch = false;
      if (language === Language.TR && article.translations?.tr) {
        titleMatch = article.translations.tr.title.toLowerCase().includes(lowerQuery);
      } else {
        titleMatch = article.title.toLowerCase().includes(lowerQuery);
      }

      // If title matches, return immediately
      if (titleMatch) {
        return true;
      }

      // Search in content (beginner + advanced)
      let contentMatch = false;
      
      if (language === Language.TR && article.translations?.tr?.content) {
        const content = article.translations.tr.content;
        const beginnerContent = (content.beginner || '').toLowerCase();
        const advancedContent = (content.advanced || '').toLowerCase();
        contentMatch = beginnerContent.includes(lowerQuery) || advancedContent.includes(lowerQuery);
      } else if (article.content) {
        const beginnerContent = (article.content.beginner || '').toLowerCase();
        const advancedContent = (article.content.advanced || '').toLowerCase();
        contentMatch = beginnerContent.includes(lowerQuery) || advancedContent.includes(lowerQuery);
      }

      return contentMatch;
    });
  }

  /**
   * Get paginated articles
   * @param page - Current page (1-indexed)
   * @param articlesPerPage - Number of articles per page (default: 24)
   */
  getPaginatedArticles(articles: Article[], page: number = 1, articlesPerPage: number = 24): {
    articles: Article[];
    currentPage: number;
    totalPages: number;
    totalArticles: number;
  } {
    const totalArticles = articles.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));
    
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      currentPage,
      totalPages,
      totalArticles,
    };
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

    // Return content based on difficulty level, fallback to beginner if not found
    return (content as any)[difficulty] || content.beginner;
  }
}

// Singleton instance
export const articleService = new ArticleService();
