import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, AnalogClock } from '../components';
import { useProgress } from '../context';
import styles from './TitleScreen.module.css';

/**
 * Titelscreen der Uhrzeit-Abenteuer App.
 * 
 * Zeigt den App-Titel, eine dekorative Uhr und einen Start-Button.
 * Startet auch eine neue Spielsitzung im Progress-Tracking.
 */
export function TitleScreen() {
  const navigate = useNavigate();
  const { startSession } = useProgress();

  // Neue Sitzung starten, wenn der Titelscreen geladen wird
  useEffect(() => {
    startSession();
  }, [startSession]);

  const handleStart = () => {
    navigate('/menu');
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* App-Logo/Titel */}
        <div className={styles.titleGroup}>
          <span className={styles.emoji}>⏰</span>
          <h1 className={styles.title}>Uhrzeit-Abenteuer</h1>
          <p className={styles.subtitle}>Lerne spielend die Uhr zu lesen!</p>
        </div>

        {/* Dekorative Uhr */}
        <div className={styles.clockContainer}>
          <AnalogClock 
            hour={new Date().getHours()} 
            minute={new Date().getMinutes()} 
            size={200} 
          />
        </div>

        {/* Start-Button */}
        <Button 
          variant="primary" 
          size="large" 
          onClick={handleStart}
          className={styles.startButton}
        >
          🚀 Start
        </Button>

        {/* Footer */}
        <p className={styles.footer}>
          Ein Lernspiel für kleine Entdecker
        </p>
      </div>
    </Layout>
  );
}
