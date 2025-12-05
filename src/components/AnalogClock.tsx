import React from 'react';
import styles from './AnalogClock.module.css';

/**
 * Props für die AnalogClock-Komponente.
 */
interface AnalogClockProps {
  /** Stunde (0-12) */
  hour: number;
  /** Minute (0-59) */
  minute?: number;
  /** Größe der Uhr in Pixeln */
  size?: number;
}

/**
 * Analoge Uhr-Komponente.
 * 
 * Zeigt eine stilisierte analoge Uhr mit Stundenmarkierungen,
 * Stundenzeiger und Minutenzeiger.
 */
export function AnalogClock({ 
  hour, 
  minute = 0, 
  size = 250 
}: AnalogClockProps) {
  // Winkel für die Zeiger berechnen
  // Stundenzeiger: 360° / 12 Stunden = 30° pro Stunde, plus Anteil der Minuten
  const hourDegrees = (hour % 12) * 30 + (minute / 60) * 30;
  // Minutenzeiger: 360° / 60 Minuten = 6° pro Minute
  const minuteDegrees = minute * 6;

  // Stundenmarkierungen generieren
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const markerLength = i % 3 === 0 ? 15 : 8; // Längere Marker bei 3, 6, 9, 12
    const innerRadius = 85 - markerLength;
    const outerRadius = 85;
    
    return (
      <line
        key={i}
        x1={50 + innerRadius * Math.cos(angle)}
        y1={50 + innerRadius * Math.sin(angle)}
        x2={50 + outerRadius * Math.cos(angle)}
        y2={50 + outerRadius * Math.sin(angle)}
        className={i % 3 === 0 ? styles.majorMarker : styles.minorMarker}
      />
    );
  });

  // Stundenzahlen generieren
  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const radius = 68;
    
    return (
      <text
        key={num}
        x={50 + radius * Math.cos(angle)}
        y={50 + radius * Math.sin(angle)}
        className={styles.hourNumber}
        dominantBaseline="central"
        textAnchor="middle"
      >
        {num}
      </text>
    );
  });

  return (
    <div className={styles.clockWrapper} style={{ width: size, height: size }}>
      <svg 
        viewBox="0 0 100 100" 
        className={styles.clock}
      >
        {/* Uhr-Hintergrund */}
        <defs>
          <linearGradient id="clockFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff9e6" />
            <stop offset="100%" stopColor="#ffe066" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Äußerer Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          className={styles.outerRing}
        />
        
        {/* Uhr-Zifferblatt */}
        <circle 
          cx="50" 
          cy="50" 
          r="44" 
          className={styles.face}
          filter="url(#shadow)"
        />
        
        {/* Stundenmarkierungen */}
        {hourMarkers}
        
        {/* Stundenzahlen */}
        {hourNumbers}
        
        {/* Stundenzeiger */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          className={styles.hourHand}
          transform={`rotate(${hourDegrees}, 50, 50)`}
        />
        
        {/* Minutenzeiger */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          className={styles.minuteHand}
          transform={`rotate(${minuteDegrees}, 50, 50)`}
        />
        
        {/* Mittelpunkt */}
        <circle 
          cx="50" 
          cy="50" 
          r="4" 
          className={styles.center}
        />
        <circle 
          cx="50" 
          cy="50" 
          r="2" 
          className={styles.centerDot}
        />
      </svg>
    </div>
  );
}
