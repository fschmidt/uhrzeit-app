import { StorageClient } from './StorageClient';

/**
 * Implementierung des StorageClient-Interface mit window.localStorage.
 * 
 * Diese Klasse kapselt alle localStorage-Operationen und kümmert sich
 * um die JSON-Serialisierung/-Deserialisierung der Werte.
 */
export class LocalStorageClient implements StorageClient {
  /** Präfix für alle Keys, um Konflikte zu vermeiden */
  private readonly prefix: string;

  /**
   * Erstellt eine neue LocalStorageClient-Instanz.
   * @param prefix - Optionales Präfix für alle Storage-Keys (Standard: 'uhrzeit_app_')
   */
  constructor(prefix: string = 'uhrzeit_app_') {
    this.prefix = prefix;
  }

  /**
   * Generiert den vollständigen Key mit Präfix.
   */
  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Liest einen Wert aus dem localStorage und deserialisiert ihn.
   */
  getItem<T>(key: string): T | null {
    try {
      const fullKey = this.getFullKey(key);
      const item = window.localStorage.getItem(fullKey);
      
      if (item === null) {
        return null;
      }
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Fehler beim Lesen von "${key}" aus localStorage:`, error);
      return null;
    }
  }

  /**
   * Serialisiert und speichert einen Wert im localStorage.
   */
  setItem<T>(key: string, value: T): void {
    try {
      const fullKey = this.getFullKey(key);
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(fullKey, serialized);
    } catch (error) {
      console.error(`Fehler beim Speichern von "${key}" in localStorage:`, error);
    }
  }

  /**
   * Entfernt einen Wert aus dem localStorage.
   */
  removeItem(key: string): void {
    try {
      const fullKey = this.getFullKey(key);
      window.localStorage.removeItem(fullKey);
    } catch (error) {
      console.error(`Fehler beim Entfernen von "${key}" aus localStorage:`, error);
    }
  }

  /**
   * Löscht alle Werte mit dem konfigurierten Präfix aus dem localStorage.
   */
  clear(): void {
    try {
      // Nur Keys mit unserem Präfix löschen
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => window.localStorage.removeItem(key));
    } catch (error) {
      console.error('Fehler beim Leeren des localStorage:', error);
    }
  }
}

// Singleton-Instanz für einfache Verwendung
export const localStorageClient = new LocalStorageClient();
