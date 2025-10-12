import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useChatStore } from '@stores/chatStore';
import { useSettingsStore } from '@stores/settingsStore';
import { geminiService } from '@services/GeminiService';
import { PromptService } from '@services/PromptService';
import { Article } from '@models/Article';
import astronautIcon from './astronaut-icon.png';

interface AIChatbotProps {
  currentArticle?: Article | null;
}

/**
 * AI Chatbot Component
 * Floating astronaut assistant with context-aware responses
 */
export const AIChatbot: React.FC<AIChatbotProps> = ({ currentArticle }) => {
  const { language } = useSettingsStore();
  const {
    isChatOpen,
    isTyping,
    setCurrentArticle,
    addMessage,
    clearHistory,
    toggleChat,
    setTyping,
    getMessages,
  } = useChatStore();

  const [inputText, setInputText] = useState('');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Audio refs
  const sendSoundRef = useRef<HTMLAudioElement | null>(null);
  const receiveSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    // Create audio elements (using simple beep sounds via data URI)
    sendSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZVA0QVq7n77BdGAg+ltv0xXInBSx+zPLaizsIHGe57OihUBELTKXh8bllHAU2jdXzzn0vBSh6yu7gkUMKFGGz6OyhUxELTqbh8bdlHAY3kNXy0H4wBSh6yO7ekUIKE2Cx6OuiURIKTaXi8bllHAU2jNTz0H0vBSh5yO3gkUILFGCy6OuiURIKTKTi8bdmGwY3j9Ty0H0vBSh5x+7fkUMLFGCy6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhm');
    receiveSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZVA0QVq7n77BdGAg+ltv0xXInBSx+zPLaizsIHGe57OihUBELTKXh8bllHAU2jdXzzn0vBSh6yu7gkUMKFGGz6OyhUxELTqbh8bdlHAY3kNXy0H4wBSh6yO7ekUIKE2Cx6OuiURIKTaXi8bllHAU2jNTz0H0vBSh5yO3gkUILFGCy6OuiURIKTKTi8bdmGwY3j9Ty0H0vBSh5x+7fkUMLFGCy6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhmHAU2jdTy0H0vBSh5x+3fkUMLFGCx6OyhUhEKTKPh8bhm');
  }, []);

  // Sync current article with store
  useEffect(() => {
    setCurrentArticle(currentArticle?.id || null);
  }, [currentArticle, setCurrentArticle]);

  // Get messages for current context
  const messages = getMessages();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  // Play sound effect
  const playSound = (type: 'send' | 'receive') => {
    if (!isSoundEnabled) return;
    
    try {
      const audio = type === 'send' ? sendSoundRef.current : receiveSoundRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(err => console.log('Audio play failed:', err));
      }
    } catch (err) {
      console.log('Audio error:', err);
    }
  };

  // Send message to AI
  const handleSendMessage = async () => {
    const trimmedText = inputText.trim();
    if (!trimmedText || isTyping) return;

    // Add user message
    addMessage({
      role: 'user',
      content: trimmedText,
    });

    playSound('send');
    setInputText('');
    setTyping(true);

    try {
      // Prepare system prompt based on mode
      const systemPrompt = currentArticle
        ? PromptService.getArticleModePrompt(currentArticle, language)
        : PromptService.getGeneralModePrompt(language);

      // Prepare message history for Gemini
      const geminiMessages: Array<{ role: 'user' | 'model'; parts: { text: string }[] }> = messages
        .slice(-6) // Last 3 exchanges (6 messages)
        .map(msg => ({
          role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
          parts: [{ text: msg.content }],
        }));

      // Add current message
      geminiMessages.push({
        role: 'user' as const,
        parts: [{ text: trimmedText }],
      });

      // Call Gemini API
      const response = await geminiService.sendMessage(geminiMessages, systemPrompt);

      // Add AI response
      addMessage({
        role: 'assistant',
        content: response,
      });

      playSound('receive');
    } catch (error) {
      console.error('AI Error:', error);
      
      // Error message in user's language
      const errorMessage = language === 'tr'
        ? '😔 Üzgünüm, şu anda bir hata oluştu. Lütfen tekrar deneyin.'
        : '😔 Sorry, an error occurred. Please try again.';

      addMessage({
        role: 'assistant',
        content: errorMessage,
      });
    } finally {
      setTyping(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat history
  const handleClearHistory = () => {
    const confirmMessage = language === 'tr'
      ? 'Sohbet geçmişini temizlemek istediğinizden emin misiniz?'
      : 'Are you sure you want to clear chat history?';
    
    if (window.confirm(confirmMessage)) {
      clearHistory();
      playSound('send');
    }
  };

  return (
    <>
      {/* Floating Astronaut Avatar - Moon Surface Theme */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleChat}
          className="relative w-14 h-14 md:w-20 md:h-20 rounded-full cursor-pointer overflow-hidden group"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 -4px 8px rgba(0, 0, 0, 0.3),
              inset 0 4px 8px rgba(255, 255, 255, 0.2)
            `,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          animate={isTyping ? {
            boxShadow: [
              '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(156, 163, 175, 0.6)',
              '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 50px rgba(156, 163, 175, 0.9)',
              '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(156, 163, 175, 0.6)',
            ],
          } : {}}
          transition={isTyping ? { duration: 2, repeat: Infinity } : {}}
        >
          {/* Moon Crater Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, rgba(0,0,0,0.3) 2px, transparent 2px),
                                radial-gradient(circle at 70% 60%, rgba(0,0,0,0.2) 3px, transparent 3px),
                                radial-gradient(circle at 45% 75%, rgba(0,0,0,0.25) 2.5px, transparent 2.5px),
                                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.2) 1.5px, transparent 1.5px)`,
              backgroundSize: '100% 100%',
            }}
          />
          
          {/* Astronaut Icon */}
          <div className="absolute inset-0 flex items-center justify-center p-1.5 md:p-2">
            <img 
              src={astronautIcon} 
              alt="AI Assistant" 
              className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
              }}
            />
          </div>
          
          {/* Glow effect when typing */}
          {isTyping && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(156, 163, 175, 0.4) 0%, transparent 70%)',
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          {/* Sparkle indicator when active */}
          {isTyping && (
            <motion.div
              className="absolute -top-1 -right-1 rounded-full p-1 md:p-1.5"
              style={{
                background: 'radial-gradient(circle, #94a3b8 0%, #64748b 100%)',
                boxShadow: '0 2px 8px rgba(148, 163, 184, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)',
              }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
            </motion.div>
          )}

          {/* Notification badge for new context */}
          {!isChatOpen && currentArticle && (
            <motion.div
              className="absolute -top-1 -right-1 rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-white text-[10px] md:text-xs font-bold"
              style={{
                background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.6)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              !
            </motion.div>
          )}

          {/* Hover tooltip - Hide on mobile */}
          <div className="hidden md:block absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div 
              className="text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold"
              style={{
                background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              }}
            >
              🌙 Haldun
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Window - Moon Surface Theme */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            ref={chatContainerRef}
            className="fixed inset-4 md:inset-auto md:bottom-28 md:right-6 z-[9999] md:w-96 md:h-[520px] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
              border: '3px solid #94a3b8',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.5),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
            }}
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header - Moon Surface */}
            <div 
              className="p-4 flex items-center justify-between relative"
              style={{
                background: 'linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)',
                boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Moon Crater Pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 15% 25%, rgba(0,0,0,0.4) 3px, transparent 3px),
                                    radial-gradient(circle at 75% 65%, rgba(0,0,0,0.3) 4px, transparent 4px),
                                    radial-gradient(circle at 40% 80%, rgba(0,0,0,0.35) 2.5px, transparent 2.5px),
                                    radial-gradient(circle at 85% 30%, rgba(0,0,0,0.3) 2px, transparent 2px)`,
                  backgroundSize: '100% 100%',
                }}
              />
              <div className="flex items-center gap-3 relative z-10">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)',
                    boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <img 
                    src={astronautIcon} 
                    alt="AI" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm drop-shadow-lg">
                    🌙 Haldun
                  </h3>
                  <p className="text-slate-200 text-xs drop-shadow">
                    {currentArticle
                      ? (language === 'tr' ? 'Makale Modu' : 'Article Mode')
                      : (language === 'tr' ? 'Genel Mod' : 'General Mode')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 relative z-10">
                {/* Sound Toggle */}
                <button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  }}
                  title={isSoundEnabled ? 'Mute' : 'Unmute'}
                >
                  {isSoundEnabled ? (
                    <Volume2 className="w-4 h-4 text-white drop-shadow" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>

                {/* Clear History */}
                <button
                  onClick={handleClearHistory}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  }}
                  title={language === 'tr' ? 'Geçmişi Temizle' : 'Clear History'}
                >
                  <Trash2 className="w-4 h-4 text-white drop-shadow" />
                </button>

                {/* Close */}
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <X className="w-4 h-4 text-white drop-shadow" />
                </button>
              </div>
            </div>

            {/* Messages Area - Moon Surface */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 relative moon-scrollbar"
              style={{
                background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
              }}
            >
              {/* Moon dust particles background */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 10% 20%, rgba(0,0,0,0.1) 1px, transparent 1px),
                                    radial-gradient(circle at 80% 50%, rgba(0,0,0,0.08) 1.5px, transparent 1.5px),
                                    radial-gradient(circle at 45% 70%, rgba(0,0,0,0.09) 1px, transparent 1px),
                                    radial-gradient(circle at 25% 85%, rgba(0,0,0,0.07) 1px, transparent 1px),
                                    radial-gradient(circle at 90% 15%, rgba(0,0,0,0.08) 1px, transparent 1px)`,
                  backgroundSize: '100% 100%',
                }}
              />

              {messages.length === 0 && (
                <div className="text-center text-slate-600 mt-8 relative z-10">
                  <div className="text-4xl mb-2">🌙</div>
                  <p className="text-sm font-medium">
                    {language === 'tr'
                      ? 'Merhaba! Size nasıl yardımcı olabilirim?'
                      : 'Hello! How can I help you?'}
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'text-white'
                        : 'text-slate-800'
                    }`}
                    style={
                      message.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                          }
                        : {
                            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.05)',
                            border: '1px solid #cbd5e1',
                          }
                    }
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator - Moon Theme */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start relative z-10"
                >
                  <div 
                    className="px-4 py-3 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, #64748b 0%, #475569 100%)',
                          }}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Moon Surface */}
            <div 
              className="p-4"
              style={{
                background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
                borderTop: '2px solid #94a3b8',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    language === 'tr'
                      ? 'Mesajınızı yazın...'
                      : 'Type your message...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl text-slate-800 text-sm focus:outline-none transition-all"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                    border: '2px solid #cbd5e1',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                  }}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="px-4 py-2.5 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  style={{
                    background: !inputText.trim() || isTyping 
                      ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                      : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                    boxShadow: !inputText.trim() || isTyping 
                      ? 'none'
                      : '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

