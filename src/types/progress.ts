/**
 * Repräsentiert den Lernfortschritt eines Benutzers.
 */
export interface LearningProgress {
  /** Liste der IDs aller abgeschlossenen Level/Spiele */
  completedLevels: string[];
  /** ISO-Timestamp des letzten Spielens */
  lastPlayedAt?: string;
  /** Anzahl der korrekt beantworteten Fragen insgesamt */
  totalCorrectAnswers: number;
  /** Anzahl der Spielsitzungen */
  sessionsPlayed: number;
}

/**
 * Erstellt einen initialen, leeren Lernfortschritt.
 */
export function createInitialProgress(): LearningProgress {
  return {
    completedLevels: [],
    totalCorrectAnswers: 0,
    sessionsPlayed: 0,
  };
}
