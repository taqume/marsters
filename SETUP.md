# Proje Kurulum Rehberi / Project Setup Guide

## 🇹🇷 Türkçe

### Kurulum Adımları

1. **Node.js Kurulumu**
   - Node.js 18 veya üzeri sürüm yüklü olmalı
   - İndirme linki: https://nodejs.org/

2. **Bağımlılıkları Yükleme**
   ```powershell
   cd c:\marsters
   npm install
   ```

3. **Geliştirme Sunucusunu Başlatma**
   ```powershell
   npm run dev
   ```
   Tarayıcınızda `http://localhost:5173` adresini açın

4. **Production Build**
   ```powershell
   npm run build
   npm run preview
   ```

### Proje Özellikleri

#### ✅ Tamamlanan Özellikler:
- 3D interaktif kitaplık (Three.js ile)
- Makale arama ve filtreleme
- 4 zorluk seviyesi (Orijinal, Başlangıç, Orta, Gelişmiş)
- İngilizce/Türkçe dil desteği
- Koyu/Açık tema
- Favori sistemi (localStorage)
- Okuma geçmişi takibi
- Okuma süresi sayacı
- 10 adet biyoloji temalı NASA makalesi

#### Mimari:
- **Modüler yapı**: Her bileşen tek sorumluluk prensibine uygun
- **OOP**: Service ve Store pattern'leri kullanıldı
- **SOLID**: Tüm prensipler uygulandı
- **TypeScript**: Tip güvenliği sağlandı

### Yeni Makale Ekleme

`src/data/articles.json` dosyasını düzenleyin:

```json
{
  "id": 11,
  "title": "Makale Başlığı",
  "author": "Yazar Adı",
  "date": "2024-10-04",
  "category": "Kategori",
  "coverColor": "#FF6B6B",
  "content": {
    "original": "Tam makale...",
    "beginner": "Basit özet...",
    "intermediate": "Orta seviye...",
    "advanced": "İleri seviye..."
  },
  "translations": {
    "tr": {
      "title": "Türkçe Başlık",
      "author": "Yazar",
      "category": "Kategori",
      "content": {
        "original": "Türkçe tam metin...",
        "beginner": "Türkçe basit...",
        "intermediate": "Türkçe orta...",
        "advanced": "Türkçe ileri..."
      }
    }
  }
}
```

---

## 🇬🇧 English

### Setup Steps

1. **Node.js Installation**
   - Node.js version 18 or higher required
   - Download: https://nodejs.org/

2. **Install Dependencies**
   ```powershell
   cd c:\marsters
   npm install
   ```

3. **Start Development Server**
   ```powershell
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

4. **Production Build**
   ```powershell
   npm run build
   npm run preview
   ```

### Project Features

#### ✅ Completed Features:
- 3D interactive bookshelf (with Three.js)
- Article search and filtering
- 4 difficulty levels (Original, Beginner, Intermediate, Advanced)
- English/Turkish language support
- Dark/Light theme
- Favorites system (localStorage)
- Reading history tracking
- Reading time tracker
- 10 biology-themed NASA articles

#### Architecture:
- **Modular structure**: Each component follows single responsibility
- **OOP**: Service and Store patterns used
- **SOLID**: All principles applied
- **TypeScript**: Type safety ensured

### Adding New Articles

Edit `src/data/articles.json`:

```json
{
  "id": 11,
  "title": "Article Title",
  "author": "Author Name",
  "date": "2024-10-04",
  "category": "Category",
  "coverColor": "#FF6B6B",
  "content": {
    "original": "Full article...",
    "beginner": "Simple summary...",
    "intermediate": "Medium level...",
    "advanced": "Advanced level..."
  },
  "translations": {
    "tr": {
      "title": "Turkish Title",
      "author": "Author",
      "category": "Category",
      "content": {
        "original": "Turkish full text...",
        "beginner": "Turkish simple...",
        "intermediate": "Turkish medium...",
        "advanced": "Turkish advanced..."
      }
    }
  }
}
```

---

## 📦 Paket Listesi / Package List

| Paket / Package | Amaç / Purpose |
|----------------|----------------|
| React 18 | UI Framework |
| TypeScript | Tip Güvenliği / Type Safety |
| Vite | Build Tool |
| Three.js | 3D Graphics |
| React Three Fiber | React için 3D / 3D for React |
| Framer Motion | Animasyonlar / Animations |
| Zustand | State Management |
| i18next | Çoklu Dil / Multi-language |
| Tailwind CSS | Styling |
| Lucide React | İkonlar / Icons |

## 🎯 Sonraki Adımlar / Next Steps

1. `npm install` komutu ile bağımlılıkları yükleyin
2. `npm run dev` ile projeyi çalıştırın
3. Tarayıcıda açın ve test edin
4. İhtiyaca göre makale ekleyin/düzenleyin
5. Renk şemasını `tailwind.config.js`'den özelleştirin

## ⚠️ Önemli Notlar / Important Notes

- **TypeScript hataları**: `npm install` sonrası düzelecek
- **3D performans**: Modern GPU gerektirir
- **LocalStorage**: Favoriler ve geçmiş tarayıcıda saklanır
- **Responsive**: Mobil için optimize edilmedi (desktop first)

## 🐛 Sorun Giderme / Troubleshooting

### Bağımlılıklar yüklenmiyor / Dependencies not installing
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### Port 5173 kullanımda / Port 5173 in use
```powershell
npm run dev -- --port 3000
```

### 3D sahne görünmüyor / 3D scene not showing
- WebGL desteğini kontrol edin / Check WebGL support
- GPU sürücülerini güncelleyin / Update GPU drivers
- Farklı tarayıcı deneyin / Try different browser
