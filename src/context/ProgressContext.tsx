import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LearningProgress, createInitialProgress } from '../types/progress';
import { ProgressRepository, LocalProgressRepository, localStorageClient } from '../services';

/**
 * Context-Wert für den Lernfortschritt.
 */
interface ProgressContextValue {
  /** Der aktuelle Lernfortschritt */
  progress: LearningProgress;
  /** Lädt den Fortschritt gerade? */
  isLoading: boolean;
  /** Markiert ein Level als abgeschlossen */
  markLevelCompleted: (levelId: string) => void;
  /** Erhöht die korrekten Antworten */
  incrementCorrectAnswers: (count?: number) => void;
  /** Startet eine neue Spielsitzung */
  startSession: () => void;
  /** Setzt den Fortschritt zurück */
  resetProgress: () => void;
  /** Prüft, ob ein Level abgeschlossen ist */
  isLevelCompleted: (levelId: string) => boolean;
}

// Context mit undefined als Default
const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

/**
 * Props für den ProgressProvider.
 */
interface ProgressProviderProps {
  children: ReactNode;
  /** Optionales Repository für Dependency Injection (z.B. für Tests) */
  repository?: ProgressRepository;
}

/**
 * Provider-Komponente für den Lernfortschritt.
 * Wickelt die App und stellt den Fortschritt global zur Verfügung.
 */
export function ProgressProvider({ children, repository }: ProgressProviderProps) {
  // Standard-Repository erstellen, falls keines übergeben wurde
  const [progressRepository] = useState<ProgressRepository>(
    () => repository ?? new LocalProgressRepository(localStorageClient)
  );
  
  const [progress, setProgress] = useState<LearningProgress>(createInitialProgress);
  const [isLoading, setIsLoading] = useState(true);

  // Fortschritt beim Mounten laden
  useEffect(() => {
    const loadedProgress = progressRepository.getProgress();
    setProgress(loadedProgress);
    setIsLoading(false);
  }, [progressRepository]);

  // Fortschritt neu laden
  const reloadProgress = useCallback(() => {
    setProgress(progressRepository.getProgress());
  }, [progressRepository]);

  // Level als abgeschlossen markieren
  const markLevelCompleted = useCallback((levelId: string) => {
    progressRepository.markLevelCompleted(levelId);
    progressRepository.updateLastPlayed();
    reloadProgress();
  }, [progressRepository, reloadProgress]);

  // Korrekte Antworten erhöhen
  const incrementCorrectAnswers = useCallback((count: number = 1) => {
    progressRepository.incrementCorrectAnswers(count);
    reloadProgress();
  }, [progressRepository, reloadProgress]);

  // Neue Spielsitzung starten
  const startSession = useCallback(() => {
    progressRepository.incrementSessions();
    progressRepository.updateLastPlayed();
    reloadProgress();
  }, [progressRepository, reloadProgress]);

  // Fortschritt zurücksetzen
  const resetProgress = useCallback(() => {
    progressRepository.resetProgress();
    reloadProgress();
  }, [progressRepository, reloadProgress]);

  // Level-Completion prüfen
  const isLevelCompleted = useCallback((levelId: string) => {
    return progress.completedLevels.includes(levelId);
  }, [progress.completedLevels]);

  const value: ProgressContextValue = {
    progress,
    isLoading,
    markLevelCompleted,
    incrementCorrectAnswers,
    startSession,
    resetProgress,
    isLevelCompleted,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

/**
 * Hook zum Zugriff auf den Lernfortschritt.
 * Muss innerhalb eines ProgressProviders verwendet werden.
 */
export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  
  if (context === undefined) {
    throw new Error('useProgress muss innerhalb eines ProgressProviders verwendet werden');
  }
  
  return context;
}
