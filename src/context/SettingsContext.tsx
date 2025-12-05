import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ClockThemeId } from '../components/InteractiveClock';
import { localStorageClient } from '../services';

/** Spracheinstellung */
export type LanguageSetting = 'auto' | 'de' | 'en';

/** App-Einstellungen */
export interface AppSettings {
  /** Ausgewähltes Uhr-Theme */
  clockTheme: ClockThemeId;
  /** Sound/Sprachausgabe aktiviert */
  soundEnabled: boolean;
  /** Sprache der App */
  language: LanguageSetting;
}

/** Standardeinstellungen */
const DEFAULT_SETTINGS: AppSettings = {
  clockTheme: 'cuckoo',
  soundEnabled: true,
  language: 'auto',
};

/** Storage-Key für Einstellungen */
const SETTINGS_KEY = 'app_settings';

/** Context-Value Interface */
interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

/**
 * Provider für App-Einstellungen.
 * Persistiert Einstellungen automatisch im localStorage.
 */
export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Einstellungen beim Start laden
  useEffect(() => {
    const stored = localStorageClient.getItem<AppSettings>(SETTINGS_KEY);
    if (stored) {
      setSettings({ ...DEFAULT_SETTINGS, ...stored });
    }
    setIsLoaded(true);
  }, []);

  // Einstellungen bei Änderung speichern
  useEffect(() => {
    if (isLoaded) {
      localStorageClient.setItem(SETTINGS_KEY, settings);
    }
  }, [settings, isLoaded]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorageClient.removeItem(SETTINGS_KEY);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * Hook zum Zugriff auf die App-Einstellungen.
 */
export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings muss innerhalb eines SettingsProviders verwendet werden');
  }
  return context;
}
