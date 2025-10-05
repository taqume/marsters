import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Chat Message Interface
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  articleId?: number | null; // null for general mode, number for article mode
}

/**
 * Chat History per Article/General
 */
interface ChatHistory {
  messages: ChatMessage[];
  lastUpdated: number;
}

/**
 * Chat Store State
 */
interface ChatState {
  // Chat histories: key is articleId (or 'general' for general mode)
  histories: Record<string, ChatHistory>;
  
  // Current active article ID (null = general mode)
  currentArticleId: number | null;
  
  // UI State
  isChatOpen: boolean;
  isTyping: boolean;
  
  // Actions
  setCurrentArticle: (articleId: number | null) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearHistory: (articleId?: number | null) => void;
  toggleChat: () => void;
  setTyping: (isTyping: boolean) => void;
  getMessages: (articleId?: number | null) => ChatMessage[];
  openChat: () => void;
  closeChat: () => void;
}

/**
 * Chat Store with localStorage persistence
 */
export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      histories: {},
      currentArticleId: null,
      isChatOpen: false,
      isTyping: false,

      setCurrentArticle: (articleId: number | null) => {
        set({ currentArticleId: articleId });
      },

      addMessage: (message) => {
        const { currentArticleId, histories } = get();
        const key = currentArticleId === null ? 'general' : `article-${currentArticleId}`;
        
        const newMessage: ChatMessage = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          articleId: currentArticleId,
        };

        const currentHistory = histories[key] || { messages: [], lastUpdated: 0 };
        const updatedMessages = [...currentHistory.messages, newMessage];
        
        // Keep only last 10 messages per conversation
        const limitedMessages = updatedMessages.slice(-10);

        set({
          histories: {
            ...histories,
            [key]: {
              messages: limitedMessages,
              lastUpdated: Date.now(),
            },
          },
        });
      },

      clearHistory: (articleId) => {
        const { histories, currentArticleId } = get();
        const targetId = articleId !== undefined ? articleId : currentArticleId;
        const key = targetId === null ? 'general' : `article-${targetId}`;
        
        const newHistories = { ...histories };
        delete newHistories[key];
        
        set({ histories: newHistories });
      },

      toggleChat: () => {
        set((state) => ({ isChatOpen: !state.isChatOpen }));
      },

      openChat: () => {
        set({ isChatOpen: true });
      },

      closeChat: () => {
        set({ isChatOpen: false });
      },

      setTyping: (isTyping) => {
        set({ isTyping });
      },

      getMessages: (articleId) => {
        const { histories, currentArticleId } = get();
        const targetId = articleId !== undefined ? articleId : currentArticleId;
        const key = targetId === null ? 'general' : `article-${targetId}`;
        
        return histories[key]?.messages || [];
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        histories: state.histories,
        // Don't persist UI state (isChatOpen, isTyping)
      }),
    }
  )
);

