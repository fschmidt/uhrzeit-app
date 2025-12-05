import { LearningProgress } from '../../types/progress';

/**
 * Repository-Interface für die Verwaltung des Lernfortschritts.
 * 
 * Diese Abstraktion ermöglicht es, verschiedene Persistenz-Backends
 * (localStorage, API, etc.) austauschbar zu verwenden.
 */
export interface ProgressRepository {
  /**
   * Lädt den aktuellen Lernfortschritt.
   * @returns Der gespeicherte Fortschritt oder ein initialer Fortschritt
   */
  getProgress(): LearningProgress;

  /**
   * Speichert den gesamten Lernfortschritt.
   * @param progress - Der zu speichernde Fortschritt
   */
  saveProgress(progress: LearningProgress): void;

  /**
   * Markiert ein Level/Spiel als abgeschlossen.
   * @param levelId - Die eindeutige ID des Levels
   */
  markLevelCompleted(levelId: string): void;

  /**
   * Erhöht die Anzahl der korrekten Antworten.
   * @param count - Anzahl der hinzuzufügenden korrekten Antworten (Standard: 1)
   */
  incrementCorrectAnswers(count?: number): void;

  /**
   * Erhöht die Anzahl der Spielsitzungen.
   */
  incrementSessions(): void;

  /**
   * Aktualisiert den Timestamp der letzten Spielsitzung.
   */
  updateLastPlayed(): void;

  /**
   * Setzt den gesamten Fortschritt zurück.
   */
  resetProgress(): void;

  /**
   * Prüft, ob ein bestimmtes Level bereits abgeschlossen wurde.
   * @param levelId - Die zu prüfende Level-ID
   */
  isLevelCompleted(levelId: string): boolean;
}
