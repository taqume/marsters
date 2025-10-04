# NASA Biology Library 🧬

An interactive 3D web application for exploring NASA biology articles with multi-language support and adaptive content difficulty levels.

## 🚀 Features

### Core Features
- **3D Interactive Bookshelf**: Browse articles as books on a virtual shelf using Three.js
- **Smart Search**: Real-time search and filtering of articles
- **Multi-Level Content**: Read articles at different difficulty levels:
  - Original (Full article)
  - Beginner (Simplified)
  - Intermediate (Moderate complexity)
  - Advanced (Technical)
- **Bilingual Support**: English (default) and Turkish translations
- **Dark/Light Mode**: Comfortable reading in any environment

### User Features
- **Favorites System**: Save your favorite articles
- **Reading History**: Track articles you've read
- **Reading Timer**: Automatically tracks time spent reading each article
- **Statistics**: View your reading progress and habits

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion
- **State Management**: Zustand (with localStorage persistence)
- **Internationalization**: i18next + react-i18next
- **Styling**: Tailwind CSS
- **Architecture**: Modular, OOP, SOLID principles

## 📁 Project Structure

```
nasa-biology-library/
├── src/
│   ├── components/          # React components
│   │   ├── ArticleViewer/   # Full article view with level selector
│   │   ├── Book/            # 3D book component
│   │   ├── Bookshelf/       # 3D bookshelf scene
│   │   ├── Header/          # App header with controls
│   │   └── SearchBar/       # Search functionality
│   ├── data/                # Mock data
│   │   └── articles.json    # 10 biology articles
│   ├── hooks/               # Custom React hooks
│   │   └── useReadingTimer.ts
│   ├── i18n/                # Internationalization
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.ts        # English translations
│   │       └── tr.ts        # Turkish translations
│   ├── models/              # TypeScript interfaces
│   │   └── Article.ts
│   ├── services/            # Business logic
│   │   └── ArticleService.ts
│   ├── stores/              # Zustand stores
│   │   ├── favoritesStore.ts
│   │   ├── readingHistoryStore.ts
│   │   └── settingsStore.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Architecture & Design Patterns

### SOLID Principles
- **Single Responsibility**: Each component and service has one clear purpose
- **Open/Closed**: Services are extensible without modification
- **Liskov Substitution**: Interfaces are consistently implemented
- **Interface Segregation**: Focused, minimal interfaces
- **Dependency Inversion**: Components depend on abstractions (stores, services)

### Key Patterns
- **Singleton Pattern**: `ArticleService` instance
- **Observer Pattern**: Zustand stores with reactive subscriptions
- **Component Composition**: Modular React components
- **Custom Hooks**: Reusable logic (reading timer)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
cd nasa-biology-library
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

## 📚 Adding New Articles

Articles are stored in `src/data/articles.json`. To add a new article:

```json
{
  "id": 11,
  "title": "Your Article Title",
  "author": "Author Name",
  "date": "2024-01-01",
  "category": "Category Name",
  "coverColor": "#HEX_COLOR",
  "content": {
    "original": "Full article content...",
    "beginner": "Simplified version...",
    "intermediate": "Medium complexity...",
    "advanced": "Technical version..."
  },
  "translations": {
    "tr": {
      "title": "Türkçe Başlık",
      "author": "Yazar Adı",
      "category": "Kategori",
      "content": {
        "original": "Tam makale içeriği...",
        "beginner": "Basitleştirilmiş versiyon...",
        "intermediate": "Orta zorluk...",
        "advanced": "Teknik versiyon..."
      }
    }
  }
}
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  primary: {
    500: '#YOUR_COLOR',
    // ...
  }
}
```

### Languages
To add a new language:
1. Create `src/i18n/locales/[lang].ts`
2. Add translations
3. Update `Language` enum in `src/models/Article.ts`
4. Update `src/i18n/config.ts`

## 🔧 Technologies Used

| Technology | Purpose |
|------------|---------|
| React | UI framework |
| TypeScript | Type safety |
| Three.js | 3D graphics |
| React Three Fiber | React renderer for Three.js |
| Framer Motion | Smooth animations |
| Zustand | State management |
| i18next | Internationalization |
| Tailwind CSS | Utility-first styling |
| Vite | Fast build tool |

## 📊 Current Status

- ✅ Project structure created
- ✅ 10 mock articles (biology-themed)
- ✅ 3D bookshelf implementation
- ✅ Article viewer with difficulty levels
- ✅ Search functionality
- ✅ EN/TR language support
- ✅ Dark/Light mode
- ✅ Favorites system
- ✅ Reading history tracking
- ✅ Reading time tracker
- ⏳ Statistics page (structure ready)
- ⏳ Additional animations and polish

## 🚀 Future Enhancements

- PWA support for offline access
- More languages (Spanish, French, etc.)
- Export/Share functionality
- PDF generation from articles
- Advanced search filters (by category, date, etc.)
- User notes and annotations
- Audio narration of articles
- Mobile-optimized 3D experience

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes following SOLID principles
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for NASA Biology Education**
