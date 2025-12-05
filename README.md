# 🕐 Uhrzeit-Abenteuer

Eine interaktive Lern-App für Kinder zum spielerischen Erlernen der Uhrzeit.

## 🚀 Schnellstart

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die App ist dann unter `http://localhost:5173` erreichbar.

### Produktions-Build

```bash
# Für Produktion bauen
npm run build

# Produktions-Build lokal testen
npm run preview
```

---

## 📁 Projektstruktur

```
src/
├── main.tsx                    # Einstiegspunkt
├── App.tsx                     # Haupt-App mit Routing
├── vite-env.d.ts              # TypeScript Deklarationen
│
├── components/                 # Wiederverwendbare UI-Komponenten
│   ├── index.ts               # Komponenten-Exports
│   ├── Button.tsx             # Universeller Button
│   ├── Button.module.css
│   ├── Layout.tsx             # Seiten-Layout
│   ├── Layout.module.css
│   ├── AnalogClock.tsx        # Analoge Uhr-Darstellung
│   ├── AnalogClock.module.css
│   ├── FeedbackMessage.tsx    # Spielrückmeldungen
│   ├── FeedbackMessage.module.css
│   ├── Card.tsx               # Karten-Komponente
│   └── Card.module.css
│
├── routes/                     # Seiten/Screens
│   ├── index.ts               # Route-Exports
│   ├── TitleScreen.tsx        # Startbildschirm
│   ├── TitleScreen.module.css
│   ├── MainMenu.tsx           # Hauptmenü
│   ├── MainMenu.module.css
│   ├── GameClock.tsx          # Uhrzeit-Lernspiel
│   └── GameClock.module.css
│
├── services/                   # Geschäftslogik & Persistenz
│   ├── index.ts               # Service-Exports
│   ├── storage/               # Storage-Abstraktion
│   │   ├── index.ts
│   │   ├── StorageClient.ts   # Interface für Storage
│   │   └── LocalStorageClient.ts  # localStorage-Implementierung
│   └── progress/              # Fortschritts-Management
│       ├── index.ts
│       ├── ProgressRepository.ts    # Interface
│       └── LocalProgressRepository.ts  # Implementierung
│
├── context/                    # React Context für globalen State
│   ├── index.ts
│   └── ProgressContext.tsx    # Fortschritts-Provider & Hook
│
├── types/                      # TypeScript Typdefinitionen
│   ├── progress.ts            # Lernfortschritt-Typen
│   └── settings.ts            # Einstellungs-Typen
│
└── styles/                     # Globale Styles
    └── global.css             # Basis-CSS
```

---

## 🎮 Neue Spiele hinzufügen

### 1. Neue Route erstellen

Erstelle eine neue Datei in `src/routes/`, z.B. `GameHalfHours.tsx`:

```tsx
import React from 'react';
import { Layout, Button } from '../components';
import { useProgress } from '../context';

const LEVEL_ID = 'clock_half_hours';

export function GameHalfHours() {
  const { markLevelCompleted, incrementCorrectAnswers } = useProgress();
  
  // Spiellogik hier...
  
  return (
    <Layout title="Halbe Stunden">
      {/* Spiel-UI */}
    </Layout>
  );
}
```

### 2. Route registrieren

In `src/App.tsx`:

```tsx
import { GameHalfHours } from './routes';

// In Routes:
<Route path="/game/half-hours" element={<GameHalfHours />} />
```

### 3. Menüeintrag hinzufügen

In `src/routes/MainMenu.tsx` in der `GAMES`-Liste:

```tsx
{
  id: 'half-hours',
  title: 'Halbe Stunden',
  description: 'Erkenne halb vergangene Stunden',
  icon: '🕧',
  path: '/game/half-hours',
  levelId: 'clock_half_hours',
},
```

---

## 🔧 Persistenz-Architektur

Die App verwendet eine abstrakte Storage-Schicht, die einfach ausgetauscht werden kann:

### StorageClient Interface

```typescript
interface StorageClient {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear?(): void;
}
```

### API-Client hinzufügen (Beispiel)

```typescript
// src/services/storage/ApiStorageClient.ts
import { StorageClient } from './StorageClient';

export class ApiStorageClient implements StorageClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async getItem<T>(key: string): Promise<T | null> {
    const response = await fetch(`${this.baseUrl}/storage/${key}`);
    if (!response.ok) return null;
    return response.json();
  }
  
  async setItem<T>(key: string, value: T): Promise<void> {
    await fetch(`${this.baseUrl}/storage/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
  }
  
  async removeItem(key: string): Promise<void> {
    await fetch(`${this.baseUrl}/storage/${key}`, {
      method: 'DELETE',
    });
  }
}
```

### ProgressRepository austauschen

In `src/context/ProgressContext.tsx`:

```typescript
// Statt:
new LocalProgressRepository(localStorageClient)

// Verwende:
new LocalProgressRepository(new ApiStorageClient('https://api.example.com'))
```

---

## 🎨 Styling anpassen

- **Farben**: Bearbeite die Gradienten in `Layout.module.css` und den Button-Varianten
- **Schriftarten**: Ändere die Google Fonts Imports in `global.css`
- **Komponenten**: Jede Komponente hat ein eigenes CSS-Modul für isolierte Styles

---

## 📝 Lizenz

MIT

---

## 🤝 Beitragen

1. Fork erstellen
2. Feature-Branch erstellen (`git checkout -b feature/neues-spiel`)
3. Änderungen committen (`git commit -am 'Neues Spiel hinzugefügt'`)
4. Branch pushen (`git push origin feature/neues-spiel`)
5. Pull Request erstellen
