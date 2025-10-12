# NASA Biology Library

An immersive 3D web application for exploring NASA biology articles with multi-language support and adaptive content difficulty levels.

## About

NASA Biology Library is a hackathon project that transforms biology research articles into an engaging 3D bookshelf experience. Browse articles as interactive 3D books, read at multiple difficulty levels, and get AI-powered assistance.

## Features

- 3D Interactive Bookshelf - Browse articles as beautifully rendered books on virtual shelves
- Multiple Reading Levels - View content at Original, Beginner, Intermediate, or Advanced difficulty
- Bilingual Support - Full English and Turkish translations
- AI Chatbot - Context-aware assistant powered by Google Gemini AI
- Reading Analytics - Track your reading time, history, and favorite articles
- Dark and Light Theme - Beautiful space-themed interface with theme switching
- Smart Search - Find articles by title, content, or author
- Favorites System - Save and organize your favorite articles

## Tech Stack

- React 18 with TypeScript
- Three.js and React Three Fiber for 3D graphics
- Vite as build tool
- Tailwind CSS for styling
- Zustand for state management
- i18next for internationalization
- Framer Motion for animations
- Google Gemini AI for chatbot

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup Steps

1. Clone the repository

```bash
git clone https://github.com/taqume/NasaBiologyLibrary.git
cd NasaBiologyLibrary
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory

```
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and visit http://localhost:5173

## Usage

### Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### How to Use the App

1. Browse - Scroll through the 3D bookshelf to explore articles
2. Search - Use the search bar to find specific articles
3. Read - Click on any book to open the full article
4. Adjust Level - Switch between difficulty levels
5. Favorite - Click the heart icon to save articles
6. Chat - Click the astronaut icon to discuss articles with AI

## Project Structure

```
nasa-biology-library/
├── src/
│   ├── components/       # React components
│   ├── services/         # Business logic
│   ├── stores/           # State management
│   ├── i18n/             # Translations
│   ├── models/           # TypeScript types
│   └── hooks/            # Custom hooks
├── articles.csv          # Article data
└── README.md
```

## Acknowledgments

- NASA for inspiring biology research content
- Google Gemini for AI capabilities
- Three.js community for 3D rendering tools

---

Made with love during a 48-hour hackathon

Exploring the cosmos of biology, one article at a time