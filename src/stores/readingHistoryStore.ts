import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReadingHistoryEntry } from '@models/Article';

/**
 * Reading History Store
 * Tracks articles read, time spent, and progress
 */
interface ReadingHistoryState {
  history: Map<number, ReadingHistoryEntry>;
  startReading: (articleId: number, difficultyLevel: string) => void;
  updateReadingTime: (articleId: number, seconds: number) => void;
  getHistory: () => ReadingHistoryEntry[];
  getArticleHistory: (articleId: number) => ReadingHistoryEntry | undefined;
  getTotalReadingTime: () => number;
  getUniqueArticlesRead: () => number;
}

export const useReadingHistoryStore = create<ReadingHistoryState>()(
  persist(
    (set, get) => ({
      history: new Map<number, ReadingHistoryEntry>(),
      
      startReading: (articleId: number, difficultyLevel: string) =>
        set((state) => {
          const newHistory = new Map(state.history);
          const existing = newHistory.get(articleId);
          
          if (existing) {
            newHistory.set(articleId, {
              ...existing,
              lastReadDate: new Date().toISOString(),
              lastDifficultyLevel: difficultyLevel as any,
            });
          } else {
            newHistory.set(articleId, {
              articleId,
              lastReadDate: new Date().toISOString(),
              timeSpentSeconds: 0,
              lastDifficultyLevel: difficultyLevel as any,
              progress: 0,
            });
          }
          
          return { history: newHistory };
        }),
      
      updateReadingTime: (articleId: number, seconds: number) =>
        set((state) => {
          const newHistory = new Map(state.history);
          const existing = newHistory.get(articleId);
          
          if (existing) {
            newHistory.set(articleId, {
              ...existing,
              timeSpentSeconds: existing.timeSpentSeconds + seconds,
              progress: Math.min(100, existing.progress + 5),
            });
          }
          
          return { history: newHistory };
        }),
      
      getHistory: () => Array.from(get().history.values()),
      
      getArticleHistory: (articleId: number) => get().history.get(articleId),
      
      getTotalReadingTime: () => {
        const history = Array.from(get().history.values());
        return history.reduce((total, entry) => total + entry.timeSpentSeconds, 0);
      },
      
      getUniqueArticlesRead: () => get().history.size,
    }),
    {
      name: 'reading-history-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              history: new Map(Object.entries(state.history || {}).map(([k, v]) => [Number(k), v])),
            },
          };
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              history: Object.fromEntries(value.state.history),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
