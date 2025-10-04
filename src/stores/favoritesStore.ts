import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Favorites Store
 * Manages user's favorite articles using localStorage
 */
interface FavoritesState {
  favorites: Set<number>;
  addFavorite: (articleId: number) => void;
  removeFavorite: (articleId: number) => void;
  isFavorite: (articleId: number) => boolean;
  getFavorites: () => number[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<number>(),
      
      addFavorite: (articleId: number) =>
        set((state) => ({
          favorites: new Set(state.favorites).add(articleId),
        })),
      
      removeFavorite: (articleId: number) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.delete(articleId);
          return { favorites: newFavorites };
        }),
      
      isFavorite: (articleId: number) => get().favorites.has(articleId),
      
      getFavorites: () => Array.from(get().favorites),
    }),
    {
      name: 'favorites-storage',
      // Custom storage to handle Set serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              favorites: new Set(state.favorites || []),
            },
          };
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              favorites: Array.from(value.state.favorites),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
