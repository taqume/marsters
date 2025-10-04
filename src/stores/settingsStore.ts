import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, Language } from '@models/Article';

/**
 * App Settings Store
 * Manages theme, language, and UI preferences
 */
interface SettingsState {
  theme: ThemeMode;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: ThemeMode.LIGHT,
      language: Language.EN,
      
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
        })),
      
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'settings-storage',
    }
  )
);
