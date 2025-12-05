import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider, SettingsProvider } from './context';
import { TitleScreen, MainMenu, GameClock, Settings, PracticeClock } from './routes';

/**
 * Hauptkomponente der Uhrzeit-Abenteuer App.
 * 
 * Konfiguriert das Routing und stellt die globalen
 * Provider für alle Child-Komponenten bereit.
 */
function App() {
  return (
    <SettingsProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            {/* Titelscreen - Startseite */}
            <Route path="/" element={<TitleScreen />} />
            
            {/* Hauptmenü - Spielauswahl */}
            <Route path="/menu" element={<MainMenu />} />
            
            {/* Einstellungen */}
            <Route path="/settings" element={<Settings />} />
            
            {/* Übungsmodus */}
            <Route path="/practice" element={<PracticeClock />} />
            
            {/* Lernspiele */}
            <Route path="/game/clock" element={<GameClock />} />
            
            {/* Weitere Spiele hier hinzufügen:
            <Route path="/game/half-hours" element={<GameHalfHours />} />
            <Route path="/game/quarter-hours" element={<GameQuarterHours />} />
            */}
            
            {/* Fallback - unbekannte Routen zum Titelscreen */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </SettingsProvider>
  );
}

export default App;
