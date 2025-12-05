import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button } from '../components';
import { CLOCK_THEMES, ClockThemeId } from '../components/InteractiveClock';
import { useSettings, LanguageSetting } from '../context';
import styles from './Settings.module.css';

/** Verfügbare Sprachoptionen */
const LANGUAGE_OPTIONS: { value: LanguageSetting; label: string }[] = [
  { value: 'auto', label: '🌐 Automatisch' },
  { value: 'de', label: '🇩🇪 Deutsch' },
  { value: 'en', label: '🇬🇧 English' },
];

/**
 * Toggle-Switch Komponente für Einstellungen.
 */
interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <div className={styles.toggleRow}>
      <span className={styles.toggleLabel}>{label}</span>
      <button
        onClick={onChange}
        className={`${styles.toggle} ${checked ? styles.toggleOn : styles.toggleOff}`}
        type="button"
        role="switch"
        aria-checked={checked}
      >
        <div className={styles.toggleKnob} />
      </button>
    </div>
  );
}

/**
 * Einstellungsseite der App.
 * 
 * Ermöglicht die Konfiguration von:
 * - Uhr-Theme
 * - Sound/Sprachausgabe
 */
export function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings, resetSettings } = useSettings();

  const handleThemeChange = (themeId: ClockThemeId) => {
    updateSettings({ clockTheme: themeId });
  };

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleLanguageChange = (language: LanguageSetting) => {
    updateSettings({ language });
  };

  const handleBack = () => {
    navigate('/menu');
  };

  const handleReset = () => {
    if (window.confirm('Möchtest du alle Einstellungen zurücksetzen?')) {
      resetSettings();
    }
  };

  return (
    <Layout title="Einstellungen">
      <div className={styles.container}>
        {/* Theme-Auswahl */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎨 Uhren-Design</h2>
          <div className={styles.themeGrid}>
            {(Object.entries(CLOCK_THEMES) as [ClockThemeId, typeof CLOCK_THEMES[ClockThemeId]][]).map(
              ([themeId, theme]) => (
                <button
                  key={themeId}
                  onClick={() => handleThemeChange(themeId)}
                  className={`${styles.themeCard} ${
                    settings.clockTheme === themeId ? styles.themeCardSelected : ''
                  }`}
                >
                  <span className={styles.themeIcon}>{theme.icon}</span>
                  <span className={styles.themeName}>{theme.name}</span>
                </button>
              )
            )}
          </div>
        </section>

        {/* Funktionen */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎛️ Funktionen</h2>
          <div className={styles.toggleList}>
            <ToggleSwitch
              checked={settings.soundEnabled}
              onChange={handleSoundToggle}
              label="🔊 Sprachausgabe"
            />
          </div>
        </section>

        {/* Aktionen */}
        <div className={styles.actions}>
          <Button variant="primary" onClick={handleBack} fullWidth>
            ✓ Fertig
          </Button>
          <Button variant="secondary" size="small" onClick={handleReset}>
            Einstellungen zurücksetzen
          </Button>
        </div>
      </div>
    </Layout>
  );
}
