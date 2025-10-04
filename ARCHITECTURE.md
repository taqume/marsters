# Mimari Dokümantasyon / Architecture Documentation

## 🏛️ Genel Mimari / Overall Architecture

Bu proje **Clean Architecture** ve **SOLID** prensiplerine uygun olarak tasarlanmıştır.

*This project is designed following **Clean Architecture** and **SOLID** principles.*

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│         (React Components)              │
│  - Visual components                    │
│  - User interactions                    │
│  - UI state management                  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Application Layer              │
│         (Hooks & Stores)                │
│  - Custom hooks                         │
│  - State management (Zustand)           │
│  - Side effects                         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Business Layer                │
│            (Services)                   │
│  - Business logic                       │
│  - Data transformation                  │
│  - Domain rules                         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│            Data Layer                   │
│       (Models & Data)                   │
│  - TypeScript interfaces                │
│  - Mock data (JSON)                     │
│  - Data structures                      │
└─────────────────────────────────────────┘
```

---

## 📦 Katman Açıklamaları / Layer Descriptions

### 1. Presentation Layer (Components)

**Sorumluluk**: Kullanıcı arayüzü ve etkileşimler
*Responsibility: User interface and interactions*

```typescript
components/
├── Header/           → Global navigation
├── SearchBar/        → Search functionality
├── Bookshelf/        → 3D/2D book display
├── Book/             → Individual book component
└── ArticleViewer/    → Article reading interface
```

**Prensipler**:
- ✅ Sadece görsel render
- ✅ Business logic içermez
- ✅ Stores ve services'i kullanır
- ✅ Yeniden kullanılabilir

### 2. Application Layer (Hooks & Stores)

**Sorumluluk**: Uygulama durumu ve yan etkiler
*Responsibility: Application state and side effects*

```typescript
hooks/
└── useReadingTimer.ts  → Reading time tracking logic

stores/
├── favoritesStore.ts        → Favorite articles
├── readingHistoryStore.ts   → Reading history
└── settingsStore.ts         → App settings (theme, lang)
```

**Prensipler**:
- ✅ Merkezi durum yönetimi
- ✅ localStorage entegrasyonu
- ✅ Observable pattern (Zustand)
- ✅ Persistence logic

### 3. Business Layer (Services)

**Sorumluluk**: İş mantığı ve veri işleme
*Responsibility: Business logic and data processing*

```typescript
services/
└── ArticleService.ts
    ├── getAllArticles()
    ├── getArticleById()
    ├── searchArticles()
    ├── getArticlesByIds()
    ├── getLocalizedTitle()
    └── getLocalizedContent()
```

**Prensipler**:
- ✅ Singleton pattern
- ✅ Veri dönüşümleri
- ✅ Business rules
- ✅ Framework'ten bağımsız

### 4. Data Layer (Models & Data)

**Sorumluluk**: Veri yapıları ve tipler
*Responsibility: Data structures and types*

```typescript
models/
└── Article.ts
    ├── Article interface
    ├── ArticleContent interface
    ├── DifficultyLevel enum
    ├── Language enum
    ├── ReadingHistoryEntry interface
    └── UserStatistics interface

data/
└── articles.json → Mock article data
```

---

## 🎯 SOLID Prensipleri Uygulaması / SOLID Principles Implementation

### S - Single Responsibility Principle

Her sınıf/module tek bir sorumluluğa sahip.

**Örnek**:
```typescript
// ✅ GOOD: Tek sorumluluk
class ArticleService {
  // Sadece makale işlemleri
  getAllArticles() { }
  searchArticles() { }
}

// ❌ BAD: Çoklu sorumluluk
class ArticleService {
  getAllArticles() { }
  renderArticle() { } // UI logic!
  saveToDatabase() { } // Database logic!
}
```

**Projede**:
- `ArticleService`: Sadece makale verisi işler
- `favoritesStore`: Sadece favorileri yönetir
- `useReadingTimer`: Sadece okuma süresini takip eder

---

### O - Open/Closed Principle

Genişletmeye açık, değişikliğe kapalı.

**Örnek**:
```typescript
// ✅ GOOD: Yeni özellik eklemek için değiştirmiyoruz
class ArticleService {
  private articles: Article[];
  
  // Yeni arama kriterleri eklenebilir
  searchArticles(query: string, language: Language): Article[] {
    // Extensible logic
  }
}

// Yeni özellik: Category search
class EnhancedArticleService extends ArticleService {
  searchByCategory(category: string): Article[] {
    // New feature without modifying base class
  }
}
```

---

### L - Liskov Substitution Principle

Alt sınıflar üst sınıfın yerine kullanılabilir.

**Örnek**:
```typescript
// Bookshelf interface
interface BookshelfProps {
  articles: Article[];
  onBookSelect: (article: Article) => void;
}

// ✅ Her ikisi de aynı interface'i implemente eder
<Bookshelf {...props} />        // 3D version
<BookshelfFallback {...props} /> // 2D version
```

---

### I - Interface Segregation Principle

İstemciler kullanmadıkları interface'lere bağımlı olmamalı.

**Örnek**:
```typescript
// ✅ GOOD: Küçük, odaklı interface'ler
interface Searchable {
  search(query: string): Article[];
}

interface Filterable {
  filter(criteria: FilterCriteria): Article[];
}

// ❌ BAD: Büyük, monolitik interface
interface ArticleOperations {
  search(): void;
  filter(): void;
  sort(): void;
  paginate(): void;
  export(): void;
  print(): void;
}
```

**Projede**:
- `SearchBarProps`: Sadece search için gerekli props
- `ArticleViewerProps`: Sadece görüntüleme için gerekli props

---

### D - Dependency Inversion Principle

Üst seviye modüller alt seviye modüllere bağımlı olmamalı.

**Örnek**:
```typescript
// ✅ GOOD: Abstraction'a bağımlı
const ArticleViewer = ({ article, onClose }: ArticleViewerProps) => {
  const { language } = useSettingsStore(); // Store abstraction
  const service = articleService;          // Service abstraction
  
  const content = service.getLocalizedContent(article, language);
}

// ❌ BAD: Concrete implementation'a bağımlı
const ArticleViewer = () => {
  const content = localStorage.getItem('article'); // Direct dependency!
}
```

---

## 🔄 Veri Akışı / Data Flow

```
User Action (Click book)
    ↓
Component Event Handler
    ↓
Update Zustand Store
    ↓
Store Notifies Subscribers
    ↓
Components Re-render
    ↓
Service Layer Fetches/Transforms Data
    ↓
UI Updates
```

**Örnek Senaryo**: Makale Favorilere Ekleme

```typescript
// 1. User clicks favorite button
<button onClick={handleFavoriteToggle}>

// 2. Component calls store action
const handleFavoriteToggle = () => {
  if (isFavorite(article.id)) {
    removeFavorite(article.id); // Zustand action
  } else {
    addFavorite(article.id);    // Zustand action
  }
};

// 3. Store updates state and localStorage
addFavorite: (articleId: number) =>
  set((state) => ({
    favorites: new Set(state.favorites).add(articleId),
  })),

// 4. Component re-renders with new state
const isFavorite = useFavoritesStore((state) => 
  state.isFavorite(article.id)
);
```

---

## 🗄️ State Management Stratejisi / State Management Strategy

### Zustand Store Yapısı

```typescript
// Pattern: Feature-based stores
stores/
├── favoritesStore.ts       → User favorites
├── readingHistoryStore.ts  → Reading tracking
└── settingsStore.ts        → App preferences
```

### Store Anatomy

```typescript
interface StoreState {
  // 1. State
  data: DataType;
  
  // 2. Actions (mutations)
  updateData: (newData: DataType) => void;
  
  // 3. Selectors (computed)
  getData: () => DataType;
}

// 4. Persistence
persist(storeLogic, {
  name: 'storage-key',
  storage: customStorage,
});
```

### Kullanım Paterni

```typescript
// Component'te kullanım
const Component = () => {
  // ✅ Selective subscription (optimize performance)
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  
  // ❌ Full store subscription (bad performance)
  const store = useFavoritesStore();
};
```

---

## 🎨 Component Patterns

### Container/Presentational Pattern

```typescript
// Container: Logic
const ArticleViewerContainer = ({ articleId }: { articleId: number }) => {
  const article = useArticle(articleId);
  const { language } = useSettings();
  
  if (!article) return <Loading />;
  
  return <ArticleViewerPresentation article={article} language={language} />;
};

// Presentational: Pure UI
const ArticleViewerPresentation = ({ article, language }) => {
  return <div>{article.title}</div>;
};
```

### Composition Pattern

```typescript
// ✅ GOOD: Composition
<Bookshelf>
  {articles.map(article => (
    <Book article={article} />
  ))}
</Bookshelf>

// ❌ BAD: Tight coupling
<BookshelfWithBooks articles={articles} />
```

---

## 🔌 Custom Hooks Stratejisi / Custom Hooks Strategy

### Hook Anatomy

```typescript
// useReadingTimer.ts
export const useReadingTimer = (
  articleId: number | null,
  isReading: boolean
) => {
  // 1. State management
  const startTimeRef = useRef<number>(Date.now());
  
  // 2. Side effects
  useEffect(() => {
    // Setup
    const interval = setInterval(() => {
      // Update logic
    }, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, [articleId, isReading]);
  
  // 3. Return API (optional)
  return { elapsed };
};
```

### Hook Rules

1. ✅ Yeniden kullanılabilir logic
2. ✅ Side effect yönetimi
3. ✅ Temiz cleanup
4. ✅ Dependency array doğru
5. ❌ Business logic içermez

---

## 📡 Service Pattern

### Service Design

```typescript
class ArticleService {
  // 1. Private state
  private articles: Article[];
  
  // 2. Constructor
  constructor() {
    this.articles = articlesData as Article[];
  }
  
  // 3. Public methods
  public getAllArticles(): Article[] {
    return this.articles;
  }
  
  // 4. Pure functions (no side effects)
  public searchArticles(query: string): Article[] {
    return this.articles.filter(/* ... */);
  }
}

// 5. Singleton export
export const articleService = new ArticleService();
```

### Service Benefits

- ✅ Testable
- ✅ Reusable
- ✅ Framework agnostic
- ✅ Single source of truth
- ✅ Easy to mock

---

## 🌐 Internationalization Strategy

### i18n Architecture

```typescript
// 1. Translation files (per language)
locales/
├── en.ts → English translations
└── tr.ts → Turkish translations

// 2. Configuration
i18n.init({
  resources: { en, tr },
  lng: 'en',           // Default
  fallbackLng: 'en',   // Fallback
});

// 3. Usage in components
const { t, i18n } = useTranslation();

// 4. Dynamic content
articleService.getLocalizedTitle(article, language);
```

---

## 🎯 Best Practices

### ✅ DO

```typescript
// Explicit types
interface Props {
  title: string;
  count: number;
}

// Small, focused components
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

// Meaningful names
const useArticleSearchWithFilters = () => { };
```

### ❌ DON'T

```typescript
// Avoid 'any'
const data: any = fetchData();

// Avoid huge components
const GiantComponent = () => {
  // 500 lines of code
};

// Avoid unclear names
const useData = () => { };
const thing = getData();
```

---

## 🧪 Testing Strategy (Future)

```typescript
// Unit tests: Services
describe('ArticleService', () => {
  it('should search articles by title', () => {
    const results = articleService.searchArticles('DNA');
    expect(results).toHaveLength(1);
  });
});

// Integration tests: Stores
describe('favoritesStore', () => {
  it('should add and remove favorites', () => {
    // Test store logic
  });
});

// Component tests: UI
describe('ArticleViewer', () => {
  it('should display article title', () => {
    render(<ArticleViewer article={mockArticle} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
```

---

## 📚 Kaynaklar / Resources

- **Clean Architecture**: Robert C. Martin
- **SOLID Principles**: Robert C. Martin
- **React Patterns**: Official React docs
- **TypeScript Best Practices**: TypeScript handbook
- **Zustand**: Official documentation

---

**Mimari Prensip**: Separation of Concerns + Dependency Injection + Single Source of Truth

*Architecture Principle: Separation of Concerns + Dependency Injection + Single Source of Truth*
