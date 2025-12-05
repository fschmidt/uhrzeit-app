import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from '../components';
import { InteractiveClock, speakTime, getBrowserLanguage } from '../components/InteractiveClock';
import { useSettings } from '../context';
import styles from './PracticeClock.module.css';

/**
 * Übungsmodus zum freien Erkunden der Uhr.
 * 
 * Die Kinder können:
 * - Die Zeiger frei bewegen
 * - Sich die eingestellte Uhrzeit vorlesen lassen
 */
export function PracticeClock() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(30);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!settings.soundEnabled) return;
    setIsSpeaking(true);
    speakTime(hour, minute);
    setTimeout(() => setIsSpeaking(false), 2500);
  };

  const handleBack = () => {
    navigate('/menu');
  };

  const browserLang = getBrowserLanguage();

  return (
    <Layout title="Uhrzeiten üben">
      <div className={styles.container}>
        {/* Uhr */}
        <div className={styles.clockContainer}>
          <InteractiveClock
            hour={hour}
            minute={minute}
            onHourChange={setHour}
            onMinuteChange={setMinute}
            theme={settings.clockTheme}
            allowTimeEdit={true}
            size={280}
          />
        </div>

        {/* Sprachausgabe Button */}
        {settings.soundEnabled && (
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className={`${styles.speakButton} ${isSpeaking ? styles.speakButtonDisabled : ''}`}
          >
            <span className={styles.speakIcon}>{isSpeaking ? '🔉' : '🔊'}</span>
            <span>Uhrzeit anhören</span>
            <span className={styles.langFlag}>{browserLang === 'de' ? '🇩🇪' : '🇬🇧'}</span>
          </button>
        )}

        {/* Zurück Button */}
        <Button variant="secondary" onClick={handleBack}>
          ← Zurück zum Menü
        </Button>
      </div>
    </Layout>
  );
}
