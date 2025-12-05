import { LearningProgress, createInitialProgress } from '../../types/progress';
import { StorageClient } from '../storage/StorageClient';
import { ProgressRepository } from './ProgressRepository';

/** Storage-Key für den Lernfortschritt */
const PROGRESS_STORAGE_KEY = 'learning_progress';

/**
 * Lokale Implementierung des ProgressRepository mit StorageClient.
 * 
 * Diese Klasse verwendet den abstrakten StorageClient für die Persistenz,
 * sodass sie sowohl mit localStorage als auch mit anderen Backends
 * verwendet werden kann.
 */
export class LocalProgressRepository implements ProgressRepository {
  private readonly storageClient: StorageClient;

  /**
   * Erstellt eine neue LocalProgressRepository-Instanz.
   * @param storageClient - Der zu verwendende Storage-Client
   */
  constructor(storageClient: StorageClient) {
    this.storageClient = storageClient;
  }

  /**
   * Lädt den Lernfortschritt aus dem Storage.
   * Falls kein Fortschritt existiert, wird ein initialer Fortschritt zurückgegeben.
   */
  getProgress(): LearningProgress {
    const stored = this.storageClient.getItem<LearningProgress>(PROGRESS_STORAGE_KEY);
    
    if (stored === null) {
      return createInitialProgress();
    }
    
    // Sicherstellen, dass alle Felder vorhanden sind (für Abwärtskompatibilität)
    return {
      ...createInitialProgress(),
      ...stored,
    };
  }

  /**
   * Speichert den Lernfortschritt im Storage.
   */
  saveProgress(progress: LearningProgress): void {
    this.storageClient.setItem(PROGRESS_STORAGE_KEY, progress);
  }

  /**
   * Markiert ein Level als abgeschlossen.
   * Fügt die Level-ID zur Liste hinzu, falls noch nicht vorhanden.
   */
  markLevelCompleted(levelId: string): void {
    const progress = this.getProgress();
    
    if (!progress.completedLevels.includes(levelId)) {
      progress.completedLevels.push(levelId);
      this.saveProgress(progress);
    }
  }

  /**
   * Erhöht den Zähler für korrekte Antworten.
   */
  incrementCorrectAnswers(count: number = 1): void {
    const progress = this.getProgress();
    progress.totalCorrectAnswers += count;
    this.saveProgress(progress);
  }

  /**
   * Erhöht den Zähler für Spielsitzungen.
   */
  incrementSessions(): void {
    const progress = this.getProgress();
    progress.sessionsPlayed += 1;
    this.saveProgress(progress);
  }

  /**
   * Aktualisiert den Timestamp der letzten Spielsitzung.
   */
  updateLastPlayed(): void {
    const progress = this.getProgress();
    progress.lastPlayedAt = new Date().toISOString();
    this.saveProgress(progress);
  }

  /**
   * Setzt den gesamten Fortschritt auf die Initialwerte zurück.
   */
  resetProgress(): void {
    this.storageClient.removeItem(PROGRESS_STORAGE_KEY);
  }

  /**
   * Prüft, ob ein Level bereits abgeschlossen wurde.
   */
  isLevelCompleted(levelId: string): boolean {
    const progress = this.getProgress();
    return progress.completedLevels.includes(levelId);
  }
}
