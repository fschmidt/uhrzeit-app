import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Card, Button } from '../components';
import { useProgress } from '../context';
import styles from './MainMenu.module.css';

/**
 * Definition eines Lernspiels für das Menü.
 */
interface GameMenuItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  levelId?: string; // Optional, da nicht alle Aktivitäten Levels haben
}

/**
 * Liste aller verfügbaren Lernspiele und Aktivitäten.
 */
const GAMES: GameMenuItem[] = [
  {
    id: 'practice',
    title: 'Uhrzeiten üben',
    description: 'Stelle die Uhr frei ein und höre die Zeit',
    icon: '🎯',
    path: '/practice',
  },
  {
    id: 'clock',
    title: 'Uhr lesen',
    description: 'Lerne volle Stunden auf der Uhr zu erkennen',
    icon: '🕐',
    path: '/game/clock',
    levelId: 'clock_full_hours',
  },
  // Weitere Spiele können hier hinzugefügt werden:
  // {
  //   id: 'half-hours',
  //   title: 'Halbe Stunden',
  //   description: 'Erkenne halb vergangene Stunden',
  //   icon: '🕧',
  //   path: '/game/half-hours',
  //   levelId: 'clock_half_hours',
  // },
];

/**
 * Hauptmenü der Uhrzeit-Abenteuer App.
 * 
 * Zeigt verfügbare Lernspiele, Fortschrittsübersicht und
 * Navigation zum Titelscreen.
 */
export function MainMenu() {
  const navigate = useNavigate();
  const { progress, isLevelCompleted, resetProgress } = useProgress();

  const handleGameSelect = (game: GameMenuItem) => {
    navigate(game.path);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleReset = () => {
    if (window.confirm('Möchtest du wirklich deinen gesamten Fortschritt löschen?')) {
      resetProgress();
    }
  };

  // Nur Spiele mit levelId zählen
  const gamesWithLevels = GAMES.filter(g => g.levelId);
  const completedCount = progress.completedLevels.length;
  const totalGames = gamesWithLevels.length;

  return (
    <Layout title="Wähle ein Spiel">
      <div className={styles.container}>
        {/* Einstellungs-Button */}
        <button className={styles.settingsButton} onClick={handleSettings}>
          ⚙️
        </button>

        {/* Fortschrittsanzeige */}
        <div className={styles.progressSection}>
          <div className={styles.progressCard}>
            <div className={styles.progressIcon}>🏆</div>
            <div className={styles.progressInfo}>
              <span className={styles.progressLabel}>Dein Fortschritt</span>
              <span className={styles.progressValue}>
                {completedCount} / {totalGames} Spiele gemeistert
              </span>
              {progress.totalCorrectAnswers > 0 && (
                <span className={styles.progressDetail}>
                  ✓ {progress.totalCorrectAnswers} richtige Antworten
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Spielauswahl */}
        <div className={styles.gamesGrid}>
          {GAMES.map((game) => {
            const completed = game.levelId ? isLevelCompleted(game.levelId) : false;
            
            return (
              <Card
                key={game.id}
                icon={game.icon}
                title={game.title}
                onClick={() => handleGameSelect(game)}
                className={completed ? styles.completedGame : ''}
              >
                <p>{game.description}</p>
                {completed && (
                  <span className={styles.completedBadge}>✓ Gemeistert</span>
                )}
              </Card>
            );
          })}
        </div>

        {/* Platzhalter für zukünftige Spiele */}
        <div className={styles.comingSoon}>
          <span className={styles.comingSoonIcon}>🔜</span>
          <span className={styles.comingSoonText}>
            Weitere Spiele kommen bald!
          </span>
        </div>

        {/* Navigation */}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleBack}>
            ← Zurück
          </Button>
          {progress.totalCorrectAnswers > 0 && (
            <Button variant="danger" size="small" onClick={handleReset}>
              Fortschritt löschen
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
