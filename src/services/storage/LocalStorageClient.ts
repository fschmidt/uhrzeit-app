import { StorageClient } from './StorageClient';

/**
 * Prüft ob localStorage verfügbar ist (nicht im iOS Private Mode).
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Cookie-basierte Fallback-Speicherung für iOS Private Mode.
 */
const cookieStorage = {
  getItem(key: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieKey, ...valueParts] = cookie.trim().split('=');
      if (cookieKey === key) {
        try {
          return decodeURIComponent(valueParts.join('='));
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  setItem(key: string, value: string): void {
    // Cookie für 1 Jahr speichern
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${key}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  },

  removeItem(key: string): void {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
  }
};

/**
 * Implementierung des StorageClient-Interface mit window.localStorage.
 * Verwendet Cookies als Fallback wenn localStorage nicht verfügbar ist (iOS Private Mode).
 *
 * Diese Klasse kapselt alle localStorage-Operationen und kümmert sich
 * um die JSON-Serialisierung/-Deserialisierung der Werte.
 */
export class LocalStorageClient implements StorageClient {
  /** Präfix für alle Keys, um Konflikte zu vermeiden */
  private readonly prefix: string;
  /** Ob localStorage verfügbar ist */
  private readonly useLocalStorage: boolean;

  /**
   * Erstellt eine neue LocalStorageClient-Instanz.
   * @param prefix - Optionales Präfix für alle Storage-Keys (Standard: 'uhrzeit_app_')
   */
  constructor(prefix: string = 'uhrzeit_app_') {
    this.prefix = prefix;
    this.useLocalStorage = isLocalStorageAvailable();

    if (!this.useLocalStorage) {
      console.info('localStorage nicht verfügbar, verwende Cookie-Fallback');
    }
  }

  /**
   * Generiert den vollständigen Key mit Präfix.
   */
  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Liest einen Wert aus dem Storage und deserialisiert ihn.
   */
  getItem<T>(key: string): T | null {
    try {
      const fullKey = this.getFullKey(key);
      const item = this.useLocalStorage
        ? window.localStorage.getItem(fullKey)
        : cookieStorage.getItem(fullKey);

      if (item === null) {
        return null;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Fehler beim Lesen von "${key}" aus Storage:`, error);
      return null;
    }
  }

  /**
   * Serialisiert und speichert einen Wert im Storage.
   */
  setItem<T>(key: string, value: T): void {
    try {
      const fullKey = this.getFullKey(key);
      const serialized = JSON.stringify(value);

      if (this.useLocalStorage) {
        window.localStorage.setItem(fullKey, serialized);
      } else {
        cookieStorage.setItem(fullKey, serialized);
      }
    } catch (error) {
      console.error(`Fehler beim Speichern von "${key}" in Storage:`, error);
    }
  }

  /**
   * Entfernt einen Wert aus dem Storage.
   */
  removeItem(key: string): void {
    try {
      const fullKey = this.getFullKey(key);

      if (this.useLocalStorage) {
        window.localStorage.removeItem(fullKey);
      } else {
        cookieStorage.removeItem(fullKey);
      }
    } catch (error) {
      console.error(`Fehler beim Entfernen von "${key}" aus Storage:`, error);
    }
  }

  /**
   * Löscht alle Werte mit dem konfigurierten Präfix aus dem Storage.
   */
  clear(): void {
    try {
      if (this.useLocalStorage) {
        // Nur Keys mit unserem Präfix löschen
        const keysToRemove: string[] = [];

        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            keysToRemove.push(key);
          }
        }

        keysToRemove.forEach(key => window.localStorage.removeItem(key));
      } else {
        // Bei Cookies: Alle mit Präfix löschen
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const cookieKey = cookie.trim().split('=')[0];
          if (cookieKey.startsWith(this.prefix)) {
            cookieStorage.removeItem(cookieKey);
          }
        }
      }
    } catch (error) {
      console.error('Fehler beim Leeren des Storage:', error);
    }
  }
}

// Singleton-Instanz für einfache Verwendung
export const localStorageClient = new LocalStorageClient();
