/**
 * Generische Schnittstelle für Storage-Operationen.
 * 
 * Diese Abstraktion ermöglicht es, verschiedene Storage-Backends
 * (localStorage, sessionStorage, API, etc.) austauschbar zu verwenden.
 */
export interface StorageClient {
  /**
   * Liest einen Wert aus dem Storage.
   * @param key - Der Schlüssel unter dem der Wert gespeichert ist
   * @returns Der gespeicherte Wert oder null, falls nicht vorhanden
   */
  getItem<T>(key: string): T | null;

  /**
   * Speichert einen Wert im Storage.
   * @param key - Der Schlüssel unter dem der Wert gespeichert werden soll
   * @param value - Der zu speichernde Wert
   */
  setItem<T>(key: string, value: T): void;

  /**
   * Entfernt einen Wert aus dem Storage.
   * @param key - Der Schlüssel des zu entfernenden Werts
   */
  removeItem(key: string): void;

  /**
   * Löscht alle Werte aus dem Storage.
   * Optional, da nicht alle Backends dies unterstützen müssen.
   */
  clear?(): void;
}
