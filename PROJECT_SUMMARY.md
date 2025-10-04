# NASA Biology Library - Proje Özeti / Project Summary

## 🎯 Proje Hedefi / Project Goal

NASA'nın biyoloji makalelerini interaktif 3D bir kütüphane arayüzü ile sunmak, farklı zorluk seviyelerinde içerik sağlamak ve çoklu dil desteği vermek.

*Present NASA's biology articles through an interactive 3D library interface, provide content at different difficulty levels, and offer multi-language support.*

---

## ✅ Tamamlanan Özellikler / Completed Features

### 🎨 Kullanıcı Arayüzü / User Interface
- ✅ **3D Kitaplık**: Three.js ile interaktif kitap rafı
- ✅ **2D Yedek Görünüm**: WebGL desteklemeyen cihazlar için
- ✅ **Arama Çubuğu**: Gerçek zamanlı arama ve filtreleme
- ✅ **Koyu/Açık Tema**: Göz dostu okuma modu
- ✅ **Duyarlı Tasarım**: Modern tarayıcılar için optimize

### 📚 İçerik Yönetimi / Content Management
- ✅ **4 Zorluk Seviyesi**: Original, Beginner, Intermediate, Advanced
- ✅ **10 Mock Makale**: Gerçek NASA biyoloji konuları
- ✅ **İki Dil Desteği**: İngilizce (varsayılan) ve Türkçe
- ✅ **Kolay Makale Ekleme**: JSON formatında basit yapı

### 🔧 Teknik Özellikler / Technical Features
- ✅ **Favoriler Sistemi**: localStorage ile kalıcı kayıt
- ✅ **Okuma Geçmişi**: Hangi makaleler okundu takibi
- ✅ **Okuma Süresi**: Otomatik süre ölçümü (her 10 saniyede kayıt)
- ✅ **State Management**: Zustand ile merkezi durum yönetimi
- ✅ **TypeScript**: %100 tip güvenli kod

### 🏗️ Mimari / Architecture
- ✅ **Modüler Yapı**: Her component tek sorumluluk
- ✅ **OOP Prensipler**: Service ve Store pattern'leri
- ✅ **SOLID İlkeleri**: Tüm 5 prensip uygulandı
- ✅ **Custom Hooks**: useReadingTimer gibi yeniden kullanılabilir logic

---

## 📁 Dosya Yapısı / File Structure

```
marsters/
│
├── 📄 index.html                    # Ana HTML dosyası
├── 📄 package.json                  # Bağımlılıklar ve scriptler
├── 📄 tsconfig.json                 # TypeScript yapılandırması
├── 📄 vite.config.ts               # Vite build yapılandırması
├── 📄 tailwind.config.js           # Tailwind CSS ayarları
├── 📄 README.md                     # Proje dökümantasyonu
├── 📄 SETUP.md                      # Kurulum rehberi
│
└── src/
    ├── 📄 App.tsx                   # Ana uygulama bileşeni
    ├── 📄 main.tsx                  # Giriş noktası
    ├── 📄 index.css                 # Global stiller
    │
    ├── 📂 components/               # React bileşenleri
    │   ├── ArticleViewer/           # Makale görüntüleyici
    │   │   └── ArticleViewer.tsx
    │   ├── Book/                    # 3D kitap bileşeni
    │   │   └── Book.tsx
    │   ├── Bookshelf/               # Kitaplık bileşenleri
    │   │   ├── Bookshelf.tsx        # 3D kitaplık
    │   │   └── BookshelfFallback.tsx # 2D yedek
    │   ├── Header/                  # Üst başlık
    │   │   └── Header.tsx
    │   └── SearchBar/               # Arama çubuğu
    │       └── SearchBar.tsx
    │
    ├── 📂 data/                     # Veri dosyaları
    │   └── articles.json            # 10 makale (TR/EN)
    │
    ├── 📂 hooks/                    # Custom React hooks
    │   └── useReadingTimer.ts       # Okuma süresi tracker
    │
    ├── 📂 i18n/                     # Çoklu dil
    │   ├── config.ts                # i18next yapılandırması
    │   └── locales/
    │       ├── en.ts                # İngilizce çeviriler
    │       └── tr.ts                # Türkçe çeviriler
    │
    ├── 📂 models/                   # TypeScript türleri
    │   └── Article.ts               # Veri modelleri ve interface'ler
    │
    ├── 📂 services/                 # İş mantığı katmanı
    │   └── ArticleService.ts        # Makale yönetimi servisi
    │
    └── 📂 stores/                   # Zustand state stores
        ├── favoritesStore.ts        # Favoriler yönetimi
        ├── readingHistoryStore.ts   # Okuma geçmişi
        └── settingsStore.ts         # Tema ve dil ayarları
```

---

## 🔧 Kullanılan Teknolojiler / Technologies Used

### Frontend Framework
- **React 18**: UI library
- **TypeScript 5**: Type safety
- **Vite 5**: Build tool

### 3D Graphics
- **Three.js**: 3D rendering engine
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Helpers for R3F

### UI & Styling
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### State & Data
- **Zustand**: Lightweight state management
- **i18next**: Internationalization
- **localStorage**: Persistent storage

---

## 📊 Mock Data Konuları / Mock Data Topics

1. **Microbial Life in Extreme Environments** - Aşırı Ortamlarda Mikrobiyal Yaşam
2. **DNA Damage and Repair in Space** - Uzayda DNA Hasarı ve Onarımı
3. **Plant Growth in Microgravity** - Mikrogravitede Bitki Büyümesi
4. **Bacterial Evolution in Space Stations** - Uzay İstasyonlarında Bakteriyel Evrim
5. **Human Immune System Adaptation** - İnsan Bağışıklık Sistemi Adaptasyonu
6. **Cellular Aging in Space** - Uzayda Hücresel Yaşlanma
7. **Protein Crystallization in Microgravity** - Mikrogravitede Protein Kristalizasyonu
8. **Bone Density Loss in Astronauts** - Astronotlarda Kemik Yoğunluğu Kaybı
9. **Neural Plasticity in Space** - Uzayda Sinirsel Plastisite
10. **Circadian Rhythm Disruption** - Sirkadiyen Ritim Bozulması

Her makale 4 zorluk seviyesinde ve 2 dilde mevcut! / *Each article available in 4 difficulty levels and 2 languages!*

---

## 🎯 SOLID Prensipleri / SOLID Principles

### ✅ Single Responsibility Principle
- Her component tek bir işe odaklı
- ArticleService sadece makale işlemlerini yapar
- Her store sadece kendi domain'ini yönetir

### ✅ Open/Closed Principle
- ArticleService yeni özellikler için genişletilebilir
- Stores değiştirilmeden yeni özellikler eklenebilir

### ✅ Liskov Substitution Principle
- Tüm Article interface implementasyonları birbirinin yerine kullanılabilir
- Bookshelf ve BookshelfFallback değiştirilebilir

### ✅ Interface Segregation Principle
- Küçük, odaklanmış interface'ler (Article, ReadingHistoryEntry)
- Her component sadece ihtiyacı olan props'ları alır

### ✅ Dependency Inversion Principle
- Components store'lara değil, abstract interface'lere bağlı
- Service pattern ile gevşek bağlılık

---

## 🚀 Çalıştırma / Running the Project

```powershell
# 1. Bağımlılıkları yükle / Install dependencies
cd c:\marsters
npm install

# 2. Geliştirme sunucusu / Development server
npm run dev

# 3. Production build
npm run build

# 4. Production preview
npm run preview
```

---

## 🎨 Özelleştirme / Customization

### Yeni Makale Eklemek / Adding New Articles
`src/data/articles.json` dosyasına ekle

### Renkleri Değiştirmek / Changing Colors
`tailwind.config.js` → `theme.extend.colors`

### Yeni Dil Eklemek / Adding New Language
1. `src/i18n/locales/[lang].ts` oluştur
2. `src/i18n/config.ts`'e ekle
3. `Language` enum'ına ekle

### Tema Özelleştirme / Theme Customization
`src/index.css` → Tailwind sınıfları

---

## 📈 Gelecek Geliştirmeler / Future Enhancements

### Planlanan / Planned
- 📊 İstatistik sayfası (altyapı hazır)
- 🔍 Gelişmiş arama filtreleri
- 📱 Mobil optimizasyon
- 🎨 Daha fazla animasyon

### Potansiyel / Potential
- 🌐 PWA desteği (offline çalışma)
- 📤 Paylaşma özellikleri
- 📄 PDF export
- 🎤 Sesli okuma
- 📝 Kullanıcı notları
- 🗂️ Kategori filtreleme

---

## 💡 Önemli Notlar / Important Notes

### Performans / Performance
- 3D render için modern GPU gerekir
- 10+ makale için optimizasyon düşünülmeli
- Reading timer 10 saniyede bir güncellenir (performans için)

### Depolama / Storage
- Favoriler: localStorage (sınırsız)
- Okuma geçmişi: localStorage (sınırsız)
- Temalar: localStorage

### Tarayıcı Desteği / Browser Support
- Modern tarayıcılar (Chrome, Firefox, Edge, Safari)
- WebGL 2.0 desteği gerekli (3D için)
- ES2020+ JavaScript

---

## 📞 Yardım / Support

Sorularınız için:
- README.md dosyasını okuyun
- SETUP.md kurulum rehberini inceleyin
- Kod içindeki JSDoc yorumlarını kontrol edin

---

**Proje Durumu**: ✅ Prototip Tamamlandı / Prototype Completed
**Versiyon**: 0.1.0
**Tarih**: 4 Ekim 2025
