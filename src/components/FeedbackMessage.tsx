import React from 'react';
import styles from './FeedbackMessage.module.css';

/**
 * Feedback-Typen für verschiedene Spielzustände.
 */
export type FeedbackType = 'success' | 'error' | 'info' | 'neutral';

/**
 * Props für die FeedbackMessage-Komponente.
 */
interface FeedbackMessageProps {
  /** Art des Feedbacks */
  type: FeedbackType;
  /** Nachricht zum Anzeigen */
  message: string;
  /** Sichtbarkeit des Feedbacks */
  visible: boolean;
}

/**
 * Feedback-Komponente für Spielrückmeldungen.
 * 
 * Zeigt animierte Nachrichten für Erfolg, Fehler oder
 * neutrale Informationen an.
 */
export function FeedbackMessage({ type, message, visible }: FeedbackMessageProps) {
  if (!visible) {
    return null;
  }

  const classNames = [
    styles.feedback,
    styles[type],
  ].join(' ');

  // Emoji basierend auf Typ
  const emoji = {
    success: '🎉',
    error: '🤔',
    info: '💡',
    neutral: '📌',
  }[type];

  return (
    <div className={classNames} role="alert">
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
