/**
 * Benutzereinstellungen für die App.
 */
export interface AppSettings {
  /** Benutzername (optional) */
  userName?: string;
  /** Sound aktiviert */
  soundEnabled: boolean;
  /** Schwierigkeitsgrad */
  difficulty: 'easy' | 'medium' | 'hard';
}

/**
 * Erstellt initiale Standard-Einstellungen.
 */
export function createDefaultSettings(): AppSettings {
  return {
    soundEnabled: true,
    difficulty: 'easy',
  };
}
