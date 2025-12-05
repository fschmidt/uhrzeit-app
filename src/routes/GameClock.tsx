import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, FeedbackMessage } from '../components';
import { InteractiveClock } from '../components/InteractiveClock';
import { useProgress, useSettings } from '../context';
import styles from './GameClock.module.css';

/** Level-ID für dieses Spiel (für Progress-Tracking) */
const LEVEL_ID = 'clock_full_hours';

/** Anzahl der korrekten Antworten für "Level abgeschlossen" */
const REQUIRED_CORRECT = 5;

/** Feedback-Status nach einer Antwort */
type FeedbackState = {
  type: 'success' | 'error';
  message: string;
} | null;

/**
 * Generiert eine zufällige volle Stunde (1-12).
 */
function generateRandomHour(): number {
  return Math.floor(Math.random() * 12) + 1;
}

/**
 * Generiert Antwortoptionen inkl. der korrekten Antwort.
 * @param correctHour - Die korrekte Stunde
 * @param count - Anzahl der Optionen (inkl. korrekter Antwort)
 */
function generateAnswerOptions(correctHour: number, count: number = 4): number[] {
  const options = new Set<number>([correctHour]);
  
  while (options.size < count) {
    const randomHour = Math.floor(Math.random() * 12) + 1;
    options.add(randomHour);
  }
  
  // Zu Array konvertieren und mischen
  return Array.from(options).sort(() => Math.random() - 0.5);
}

/**
 * Formatiert eine Stunde als digitale Zeit-String.
 * @param hour - Die Stunde (1-12)
 */
function formatTime(hour: number): string {
  return `${hour.toString().padStart(2, '0')}:00`;
}

/**
 * GameClock - Lernspiel zum Erkennen voller Stunden.
 * 
 * Der Spieler sieht eine analoge Uhr und muss die korrekte
 * digitale Zeit aus mehreren Optionen auswählen.
 */
export function GameClock() {
  const navigate = useNavigate();
  const { markLevelCompleted, incrementCorrectAnswers, isLevelCompleted } = useProgress();
  const { settings } = useSettings();

  // Spielzustand
  const [currentHour, setCurrentHour] = useState<number>(() => generateRandomHour());
  const [options, setOptions] = useState<number[]>(() => generateAnswerOptions(currentHour));
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  // Prüfen ob Level bereits abgeschlossen
  const alreadyCompleted = isLevelCompleted(LEVEL_ID);

  /**
   * Generiert eine neue Frage.
   */
  const generateNewQuestion = useCallback(() => {
    const newHour = generateRandomHour();
    setCurrentHour(newHour);
    setOptions(generateAnswerOptions(newHour));
    setFeedback(null);
  }, []);

  /**
   * Verarbeitet eine Antwort des Spielers.
   */
  const handleAnswer = useCallback((selectedHour: number) => {
    // Während Feedback aktiv ist, keine neue Antwort erlauben
    if (feedback !== null) return;

    const isCorrect = selectedHour === currentHour;

    if (isCorrect) {
      // Korrekte Antwort
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      setStreak(prev => prev + 1);
      incrementCorrectAnswers();

      // Verschiedene positive Nachrichten
      const successMessages = [
        'Super gemacht! 🎉',
        'Richtig! Toll! 🌟',
        'Genau! Weiter so! 💪',
        'Prima! Das war richtig! 👏',
        'Fantastisch! 🎊',
      ];
      const message = successMessages[Math.floor(Math.random() * successMessages.length)];
      setFeedback({ type: 'success', message });

      // Prüfen ob Level abgeschlossen
      if (newCorrectCount >= REQUIRED_CORRECT && !alreadyCompleted) {
        setIsComplete(true);
        markLevelCompleted(LEVEL_ID);
      }

      // Nach kurzer Pause neue Frage generieren
      setTimeout(() => {
        generateNewQuestion();
      }, 1500);
    } else {
      // Falsche Antwort
      setStreak(0);
      setFeedback({
        type: 'error',
        message: 'Hmm, das stimmt nicht ganz. Versuche es nochmal! 🤔',
      });

      // Feedback nach kurzer Zeit ausblenden
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  }, [
    currentHour, 
    feedback, 
    correctCount, 
    alreadyCompleted, 
    markLevelCompleted, 
    incrementCorrectAnswers, 
    generateNewQuestion
  ]);

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const handlePlayAgain = () => {
    setCorrectCount(0);
    setStreak(0);
    setIsComplete(false);
    generateNewQuestion();
  };

  return (
    <Layout title="Uhr lesen lernen">
      <div className={styles.container}>
        {/* Level abgeschlossen Overlay */}
        {isComplete && (
          <div className={styles.completeOverlay}>
            <div className={styles.completeCard}>
              <span className={styles.completeEmoji}>🏆</span>
              <h2 className={styles.completeTitle}>Level geschafft!</h2>
              <p className={styles.completeText}>
                Du hast {REQUIRED_CORRECT} Uhrzeiten richtig erkannt!
              </p>
              <div className={styles.completeActions}>
                <Button variant="primary" onClick={handlePlayAgain}>
                  🔄 Nochmal spielen
                </Button>
                <Button variant="secondary" onClick={handleBackToMenu}>
                  📋 Zum Menü
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Fortschrittsanzeige */}
        <div className={styles.progressBar}>
          <div className={styles.progressInfo}>
            <span>Richtig: {correctCount} / {REQUIRED_CORRECT}</span>
            {streak > 1 && <span className={styles.streak}>🔥 {streak}er Serie!</span>}
          </div>
          <div className={styles.progressTrack}>
            <div 
              className={styles.progressFill}
              style={{ width: `${Math.min((correctCount / REQUIRED_CORRECT) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Spielanleitung */}
        <p className={styles.instruction}>
          Welche Uhrzeit zeigt die Uhr?
        </p>

        {/* Analoge Uhr - jetzt mit InteractiveClock */}
        <div className={styles.clockWrapper}>
          <InteractiveClock 
            hour={currentHour} 
            minute={0} 
            theme={settings.clockTheme}
            allowTimeEdit={false}
            size={220} 
          />
        </div>

        {/* Feedback */}
        <div className={styles.feedbackArea}>
          {feedback && (
            <FeedbackMessage
              type={feedback.type}
              message={feedback.message}
              visible={true}
            />
          )}
        </div>

        {/* Antwortoptionen */}
        <div className={styles.optionsGrid}>
          {options.map((hour) => (
            <Button
              key={hour}
              variant="secondary"
              size="large"
              onClick={() => handleAnswer(hour)}
              disabled={feedback !== null}
              className={styles.optionButton}
            >
              {formatTime(hour)}
            </Button>
          ))}
        </div>

        {/* Zurück-Button */}
        <Button 
          variant="secondary" 
          onClick={handleBackToMenu}
          className={styles.backButton}
        >
          ← Zurück zum Menü
        </Button>
      </div>
    </Layout>
  );
}
