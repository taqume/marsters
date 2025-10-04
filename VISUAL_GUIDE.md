# 🎨 Görsel Proje Yapısı / Visual Project Structure

## 📊 Proje Ağacı / Project Tree

```
nasa-biology-library/
│
├── 📄 index.html                    ← Ana HTML dosyası
├── 📄 package.json                  ← Bağımlılıklar
├── 📄 tsconfig.json                 ← TypeScript config
├── 📄 vite.config.ts               ← Build config
├── 📄 tailwind.config.js           ← Tailwind config
├── 📄 postcss.config.js            ← PostCSS config
├── 📄 .eslintrc.cjs                ← ESLint rules
├── 📄 .gitignore                    ← Git ignore
│
├── 📚 README.md                     ← Genel bilgi
├── 📚 SETUP.md                      ← Kurulum rehberi
├── 📚 PROJECT_SUMMARY.md            ← Proje özeti
├── 📚 ARCHITECTURE.md               ← Mimari detay
├── 📚 START_HERE.md                 ← Başlangıç rehberi
│
└── 📁 src/
    │
    ├── 📄 main.tsx                  ← React giriş noktası
    ├── 📄 App.tsx                   ← Ana uygulama
    ├── 📄 index.css                 ← Global styles
    │
    ├── 📁 components/               ← React Bileşenleri
    │   ├── 📁 ArticleViewer/
    │   │   └── 📄 ArticleViewer.tsx ← Makale görüntüleyici
    │   │
    │   ├── 📁 Book/
    │   │   └── 📄 Book.tsx          ← 3D kitap bileşeni
    │   │
    │   ├── 📁 Bookshelf/
    │   │   ├── 📄 Bookshelf.tsx     ← 3D kitaplık
    │   │   └── 📄 BookshelfFallback.tsx ← 2D yedek
    │   │
    │   ├── 📁 Header/
    │   │   └── 📄 Header.tsx        ← Üst başlık
    │   │
    │   └── 📁 SearchBar/
    │       └── 📄 SearchBar.tsx     ← Arama çubuğu
    │
    ├── 📁 data/                     ← Veri dosyaları
    │   └── 📄 articles.json         ← 10 mock makale
    │
    ├── 📁 hooks/                    ← Custom React Hooks
    │   └── 📄 useReadingTimer.ts   ← Okuma süresi tracker
    │
    ├── 📁 i18n/                     ← Çoklu dil desteği
    │   ├── 📄 config.ts             ← i18next config
    │   └── 📁 locales/
    │       ├── 📄 en.ts             ← English
    │       └── 📄 tr.ts             ← Türkçe
    │
    ├── 📁 models/                   ← TypeScript Modeller
    │   └── 📄 Article.ts            ← Interface'ler, Enum'lar
    │
    ├── 📁 services/                 ← İş Mantığı
    │   └── 📄 ArticleService.ts    ← Makale servisi
    │
    └── 📁 stores/                   ← State Management
        ├── 📄 favoritesStore.ts     ← Favoriler
        ├── 📄 readingHistoryStore.ts ← Okuma geçmişi
        └── 📄 settingsStore.ts      ← Ayarlar (tema, dil)
```

---

## 🔄 Component İlişkileri / Component Relationships

```
┌─────────────────────────────────────────────────────┐
│                      App.tsx                        │
│  • Main container                                   │
│  • Route management                                 │
│  • Global state sync                                │
└──────────┬──────────────────────────────────────────┘
           │
           ├─────────────────────────────────┐
           │                                 │
┌──────────▼──────────┐          ┌──────────▼──────────┐
│     Header.tsx      │          │   Bookshelf.tsx     │
│  • Language switch  │          │  • 3D Scene         │
│  • Theme toggle     │          │  • Book grid        │
│  • Title            │          │  • Camera controls  │
└─────────────────────┘          └──────────┬──────────┘
                                            │
                         ┌──────────────────┼──────────────────┐
                         │                  │                  │
              ┌──────────▼──────────┐  ┌───▼───┐  ┌──────────▼──────────┐
              │     Book.tsx        │  │  ...  │  │     Book.tsx        │
              │  • 3D model         │  │       │  │  • 3D model         │
              │  • Hover effects    │  │       │  │  • Click handler    │
              │  • Click to open    │  │       │  │                     │
              └─────────────────────┘  └───────┘  └─────────────────────┘
                         │
                         │ (onClick)
                         │
              ┌──────────▼──────────────────────────┐
              │     ArticleViewer.tsx               │
              │  • Modal overlay                    │
              │  • Difficulty selector              │
              │  • Favorite button                  │
              │  • Article content                  │
              │  • Reading timer                    │
              └─────────────────────────────────────┘
```

---

## 📊 Data Flow Şeması / Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│              User Interaction                       │
│  (Click, Search, Toggle, etc.)                      │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│           React Components                          │
│  • Capture events                                   │
│  • Display UI                                       │
│  • Trigger actions                                  │
└──────────────┬──────────────────────────────────────┘
               │
         ┌─────┴─────┐
         │           │
┌────────▼────┐  ┌───▼──────────┐
│   Stores    │  │   Services   │
│  (Zustand)  │  │  (Business)  │
│             │  │              │
│ • State     │  │ • Logic      │
│ • Actions   │  │ • Transform  │
│ • Persist   │  │ • Filter     │
└────────┬────┘  └───┬──────────┘
         │           │
         │     ┌─────┘
         │     │
┌────────▼─────▼──────┐
│    localStorage     │
│  • Favorites        │
│  • History          │
│  • Settings         │
└─────────────────────┘

┌─────────────────────┐
│   articles.json     │
│  • Mock data        │
│  • 10 articles      │
│  • EN/TR content    │
└─────────────────────┘
```

---

## 🎯 Feature Map / Özellik Haritası

```
NASA Biology Library
│
├── 🔍 Search & Filter
│   ├── Real-time search
│   ├── Language-aware
│   └── Title matching
│
├── 📚 3D Library View
│   ├── Three.js scene
│   ├── Interactive books
│   ├── Hover animations
│   ├── Click to open
│   └── Camera controls
│
├── 📖 Article Viewer
│   ├── Full article display
│   ├── 4 Difficulty levels
│   │   ├── Original
│   │   ├── Beginner
│   │   ├── Intermediate
│   │   └── Advanced
│   ├── Favorite toggle
│   └── Reading timer
│
├── 🌐 Multi-language
│   ├── English (default)
│   ├── Turkish
│   └── Easy to extend
│
├── 🎨 Theme System
│   ├── Light mode
│   ├── Dark mode
│   └── Auto-apply
│
├── ⭐ Favorites
│   ├── Add/remove
│   ├── Persist
│   └── Quick access
│
└── 📊 Reading Tracking
    ├── History
    ├── Time spent
    └── Progress
```

---

## 🗂️ State Management Hierarchy

```
┌───────────────────────────────────────────────────┐
│            Application State                      │
└───────────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼──────┐ ┌──▼─────────┐
│  Settings    │ │Favorites│ │ Reading    │
│              │ │         │ │ History    │
├──────────────┤ ├─────────┤ ├────────────┤
│ • theme      │ │• ids[]  │ │• entries[] │
│ • language   │ │• add()  │ │• start()   │
│ • toggle()   │ │• remove │ │• update()  │
│ • setLang()  │ │• is?()  │ │• get()     │
└──────────────┘ └─────────┘ └────────────┘
       │              │              │
       └──────────────┼──────────────┘
                      │
              ┌───────▼────────┐
              │  localStorage  │
              │   (Persist)    │
              └────────────────┘
```

---

## 🎨 UI Component Hierarchy

```
App
│
├── Header
│   ├── Logo
│   ├── Title
│   └── Controls
│       ├── LanguageSwitch (EN/TR)
│       └── ThemeToggle (☀️/🌙)
│
├── Main
│   ├── SearchBar
│   │   └── Input
│   │
│   └── Bookshelf
│       ├── Canvas (Three.js)
│       │   ├── Lights
│       │   ├── Camera
│       │   ├── Books[]
│       │   │   └── Book (3D)
│       │   └── Background
│       │
│       └── (or) BookshelfFallback
│           └── Books[] (2D Grid)
│
└── ArticleViewer (Modal)
    ├── Overlay
    ├── Container
    │   ├── Header
    │   │   ├── BackButton
    │   │   ├── DifficultySelector
    │   │   └── FavoriteButton
    │   │
    │   └── Content
    │       ├── Title
    │       ├── Metadata
    │       │   ├── Author
    │       │   ├── Date
    │       │   └── Category
    │       │
    │       └── ArticleText
    │
    └── ReadingTimer (Hidden)
```

---

## 🔌 Service & Store Integration

```
Components
    │
    ├── Use Stores (Zustand)
    │   │
    │   ├── useFavoritesStore()
    │   │   └── { favorites, addFavorite, removeFavorite, isFavorite }
    │   │
    │   ├── useReadingHistoryStore()
    │   │   └── { history, startReading, updateTime }
    │   │
    │   └── useSettingsStore()
    │       └── { theme, language, toggleTheme, setLanguage }
    │
    └── Use Services (Business Logic)
        │
        └── articleService
            ├── getAllArticles()
            ├── getArticleById(id)
            ├── searchArticles(query, lang)
            ├── getLocalizedTitle(article, lang)
            └── getLocalizedContent(article, lang, level)
```

---

## 🎭 Animation Flow

```
User Interaction
    │
    ├── Hover Book
    │   └── Float animation (Book.tsx)
    │       └── useFrame() → position.y sine wave
    │
    ├── Click Book
    │   └── Scale up + Move forward
    │       └── isSelected = true
    │
    └── Open Article
        └── Framer Motion
            ├── Overlay: opacity 0→1
            └── Modal: scale 0.8→1, y: 50→0
```

---

## 📦 Bundle Structure (After Build)

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      ← Main bundle
│   ├── index-[hash].css     ← Styles
│   ├── vendor-[hash].js     ← Dependencies
│   └── ...
└── data/
    └── articles.json
```

---

## 🔄 Lifecycle Flow

```
1. App Mount
   ├── Initialize i18n
   ├── Load stores from localStorage
   ├── Fetch articles from JSON
   └── Apply theme

2. User Searches
   ├── Update searchQuery state
   ├── ArticleService.searchArticles()
   ├── Filter articles
   └── Re-render Bookshelf

3. User Clicks Book
   ├── Set selectedArticle
   ├── Open ArticleViewer
   ├── Start reading timer
   └── Update reading history

4. User Toggles Favorite
   ├── Call store action
   ├── Update Set
   ├── Persist to localStorage
   └── Re-render button

5. App Unmount
   ├── Save reading time
   ├── Clear intervals
   └── Cleanup
```

---

## 🎯 Key Interactions

```
┌──────────────┐    Search     ┌──────────────┐
│ SearchBar    │ ────────────> │ Bookshelf    │
└──────────────┘               └──────────────┘
                                      │
                                      │ Click
                                      ▼
┌──────────────┐   Selected   ┌──────────────┐
│ App (State)  │ <────────────│ Book         │
└──────────────┘               └──────────────┘
       │
       │ Open
       ▼
┌──────────────┐
│ArticleViewer │
├──────────────┤
│ • Difficulty │ ──┐
│ • Favorite   │   │  Update
│ • Reading    │   │
└──────────────┘   │
       │           │
       ▼           ▼
┌────────────────────┐
│   Zustand Stores   │
└────────────────────┘
```

---

## 💾 Data Persistence

```
localStorage
│
├── "favorites-storage"
│   └── { favorites: [1, 3, 7] }
│
├── "reading-history-storage"
│   └── { 
│        1: { articleId: 1, timeSpent: 120, ... },
│        3: { articleId: 3, timeSpent: 85, ... }
│      }
│
└── "settings-storage"
    └── { theme: "dark", language: "en" }
```

---

Bu görsel yapı sayesinde projeyi daha kolay anlayabilir ve geliştirebilirsiniz! 🎨

*Use these visual diagrams to better understand and develop the project!* ✨
