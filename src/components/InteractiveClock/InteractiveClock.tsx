import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CLOCK_THEMES, ROMAN_NUMERALS, ClockThemeId } from './ClockThemes';
import { ClockDecorations } from './ClockDecorations';
import styles from './InteractiveClock.module.css';

// ============================================
// Hilfsfunktionen
// ============================================

function calculateAngle(centerX: number, centerY: number, mouseX: number, mouseY: number): number {
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  if (angle < 0) angle += 360;
  return angle;
}

function angleToHour(angle: number): number {
  return Math.round(angle / 30) % 12;
}

function angleToMinute(angle: number): number {
  return Math.round(angle / 6) % 60;
}

/** Spracheinstellung-Typ */
export type LanguageOption = 'auto' | 'de' | 'en';

/** Ermittelt die Browsersprache */
export function getBrowserLanguage(): 'de' | 'en' {
  const lang = navigator.language || 'de';
  return lang.startsWith('de') ? 'de' : 'en';
}

/** Ermittelt die aktive Sprache basierend auf der Einstellung */
export function getActiveLanguage(setting: LanguageOption): 'de' | 'en' {
  if (setting === 'auto') {
    return getBrowserLanguage();
  }
  return setting;
}

/** Spricht die Uhrzeit aus */
export function speakTime(hour: number, minute: number, languageSetting: LanguageOption = 'auto'): void {
  if (!('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();

  const language = getActiveLanguage(languageSetting);
  let text = '';
  const hour12 = hour % 12 || 12;
  const hour24 = hour;

  if (language === 'de') {
    if (minute === 0) {
      text = `Es ist ${hour24} Uhr`;
    } else if (minute === 15) {
      text = `Es ist viertel nach ${hour12}`;
    } else if (minute === 30) {
      text = `Es ist halb ${(hour12 % 12) + 1}`;
    } else if (minute === 45) {
      text = `Es ist viertel vor ${(hour12 % 12) + 1}`;
    } else {
      text = `Es ist ${hour24} Uhr ${minute}`;
    }
  } else {
    const period = hour24 >= 12 ? 'PM' : 'AM';
    if (minute === 0) {
      text = `It's ${hour12} o'clock ${period}`;
    } else {
      text = `It's ${hour12} ${minute} ${period}`;
    }
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'de' ? 'de-DE' : 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// ============================================
// Props & Types
// ============================================

export interface InteractiveClockProps {
  /** Aktuelle Stunde (0-23) */
  hour: number;
  /** Aktuelle Minute (0-59) */
  minute: number;
  /** Callback wenn die Stunde geändert wird */
  onHourChange?: (hour: number) => void;
  /** Callback wenn die Minute geändert wird */
  onMinuteChange?: (minute: number) => void;
  /** Theme der Uhr */
  theme?: ClockThemeId;
  /** Erlaubt Drag & Drop zum Einstellen */
  allowTimeEdit?: boolean;
  /** Größe der Uhr in Pixeln */
  size?: number;
  /** Zusätzliche CSS-Klasse */
  className?: string;
}

// ============================================
// Komponente
// ============================================

/**
 * Interaktive analoge Uhr mit verschiedenen Themes.
 * 
 * Kann als reine Anzeige oder mit Drag & Drop zum
 * Einstellen der Uhrzeit verwendet werden.
 */
export function InteractiveClock({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
  theme = 'cuckoo',
  allowTimeEdit = false,
  size = 280,
  className = '',
}: InteractiveClockProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState<'hour' | 'minute' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const themeConfig = CLOCK_THEMES[theme];
  const colors = themeConfig.colors;
  const decorationType = themeConfig.decorations;
  const useRoman = themeConfig.useRomanNumerals;
  const isLearningTheme = theme === 'learning';

  const hourDegrees = ((hour % 12) * 30) + (minute / 60) * 30;
  const minuteDegrees = minute * 6;

  // Drag-Handle Positionen (näher zur Mitte für bessere Sichtbarkeit der Zeigerspitzen)
  const minuteHandleDistance = 45;
  const hourHandleDistance = 30;

  const canDrag = allowTimeEdit && onHourChange && onMinuteChange;

  const getMousePosition = useCallback((e: MouseEvent | TouchEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const touch = 'touches' in e ? e.touches[0] : null;
    const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
    const clientY = touch ? touch.clientY : (e as MouseEvent).clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const handlePointerDown = useCallback((e: React.MouseEvent | React.TouchEvent, type: 'hour' | 'minute') => {
    if (!canDrag) return;
    e.preventDefault();
    e.stopPropagation();
    setDragging(type);
    setIsDragging(true);
  }, [canDrag]);

  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging || !svgRef.current || !onHourChange || !onMinuteChange) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const pos = getMousePosition(e);
    const angle = calculateAngle(centerX, centerY, pos.x, pos.y);
    
    if (dragging === 'hour') {
      onHourChange(angleToHour(angle));
    } else if (dragging === 'minute') {
      onMinuteChange(angleToMinute(angle));
    }
  }, [dragging, getMousePosition, onHourChange, onMinuteChange]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const onMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        handlePointerMove(e);
      };
      const onUp = () => handlePointerUp();
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      // passive: false erlaubt preventDefault() für Touch-Events
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Alle 60 Minutenstriche generieren
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180);
    const isHourMark = i % 5 === 0;
    const innerR = isHourMark ? 78 : 83;
    const outerR = 88;
    
    return (
      <line
        key={`marker-${i}`}
        x1={100 + innerR * Math.cos(angle)}
        y1={100 + innerR * Math.sin(angle)}
        x2={100 + outerR * Math.cos(angle)}
        y2={100 + outerR * Math.sin(angle)}
        stroke={isHourMark ? colors.hourMarker : colors.minuteMarker}
        strokeWidth={isHourMark ? 3 : 1.5}
        strokeLinecap="round"
      />
    );
  });

  // Stundenzahlen
  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const r = useRoman ? 62 : 65;
    
    const fontStyles: Record<string, React.CSSProperties> = {
      tower: { fontFamily: 'Times New Roman, serif', fontSize: useRoman ? '11px' : '14px', fontWeight: 'bold' },
      cuckoo: { fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold' },
      watch: { fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' },
    };
    
    const displayNum = useRoman ? ROMAN_NUMERALS[num] : num.toString();
    
    return (
      <text
        key={`num-${num}`}
        x={100 + r * Math.cos(angle)}
        y={100 + r * Math.sin(angle)}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          ...fontStyles[theme],
          fill: colors.numbers,
          userSelect: 'none',
        }}
      >
        {displayNum}
      </text>
    );
  });

  return (
    <div className={`${styles.clockWrapper} ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 200 200"
        style={{
          width: size,
          height: size,
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        className={styles.clock}
        onContextMenu={(e) => e.preventDefault()}
      >
        <defs>
          <linearGradient id={`clockFace-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.faceGradientStart} />
            <stop offset="100%" stopColor={colors.faceGradientEnd} />
          </linearGradient>
          {theme === 'cuckoo' && (
            <pattern id="woodPattern" patternUnits="userSpaceOnUse" width="10" height="10">
              <rect width="10" height="10" fill={colors.outerRing} />
              <path d="M0 5 Q 5 3, 10 5" stroke="#4e342e" strokeWidth="0.5" fill="none" opacity="0.3" />
            </pattern>
          )}
          {theme === 'watch' && (
            <linearGradient id="metalShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#607d8b" />
              <stop offset="50%" stopColor="#37474f" />
              <stop offset="100%" stopColor="#263238" />
            </linearGradient>
          )}
        </defs>
        
        {/* Äußerer Ring - nicht für Lernuhr (wird durch Dekoration gezeichnet) */}
        {!isLearningTheme && (
          <circle
            cx="100" cy="100" r="98"
            fill={theme === 'cuckoo' ? 'url(#woodPattern)' : theme === 'watch' ? 'url(#metalShine)' : colors.outerRing}
            stroke={colors.outerRingStroke}
            strokeWidth="2"
          />
        )}

        {/* Zifferblatt - nicht für Lernuhr */}
        {!isLearningTheme && (
          <circle cx="100" cy="100" r="90" fill={`url(#clockFace-${theme})`} />
        )}

        {/* Theme-spezifische Dekorationen */}
        <ClockDecorations type={decorationType} />

        {/* Minuten- und Stundenmarkierungen - nicht für Lernuhr */}
        {!isLearningTheme && minuteMarkers}

        {/* Stundenzahlen - nicht für Lernuhr */}
        {!isLearningTheme && hourNumbers}
        
        {/* Minutenzeiger */}
        <g
          style={{ cursor: canDrag ? 'grab' : 'default' }}
          onMouseDown={(e) => handlePointerDown(e, 'minute')}
          onTouchStart={(e) => handlePointerDown(e, 'minute')}
        >
          {/* Zeiger-Schatten */}
          <line
            x1="100" y1="100" x2="100" y2="18"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth={5}
            strokeLinecap="round"
            transform={`rotate(${minuteDegrees}, 100, 100) translate(1, 1)`}
          />
          {/* Zeiger */}
          <line
            x1="100" y1="100" x2="100" y2="18"
            stroke={colors.minuteHand}
            strokeWidth={dragging === 'minute' ? 5 : 4}
            strokeLinecap="round"
            transform={`rotate(${minuteDegrees}, 100, 100)`}
          />
          {/* Unsichtbarer Klickbereich */}
          <line
            x1="100" y1="100" x2="100" y2="18"
            stroke="transparent"
            strokeWidth="20"
            strokeLinecap="round"
            transform={`rotate(${minuteDegrees}, 100, 100)`}
          />
          {/* Griff-Kreis */}
          {canDrag && (
            <circle
              cx={100 + minuteHandleDistance * Math.sin(minuteDegrees * Math.PI / 180)}
              cy={100 - minuteHandleDistance * Math.cos(minuteDegrees * Math.PI / 180)}
              r="10"
              fill={dragging === 'minute' ? colors.handleMinute : colors.minuteHand}
              stroke="white"
              strokeWidth="2"
              className={styles.handle}
            />
          )}
        </g>
        
        {/* Stundenzeiger */}
        <g
          style={{ cursor: canDrag ? 'grab' : 'default' }}
          onMouseDown={(e) => handlePointerDown(e, 'hour')}
          onTouchStart={(e) => handlePointerDown(e, 'hour')}
        >
          {/* Zeiger-Schatten */}
          <line
            x1="100" y1="100" x2="100" y2="38"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth={8}
            strokeLinecap="round"
            transform={`rotate(${hourDegrees}, 100, 100) translate(1, 1)`}
          />
          {/* Zeiger */}
          <line
            x1="100" y1="100" x2="100" y2="38"
            stroke={colors.hourHand}
            strokeWidth={dragging === 'hour' ? 8 : 6}
            strokeLinecap="round"
            transform={`rotate(${hourDegrees}, 100, 100)`}
          />
          {/* Unsichtbarer Klickbereich */}
          <line
            x1="100" y1="100" x2="100" y2="38"
            stroke="transparent"
            strokeWidth="24"
            strokeLinecap="round"
            transform={`rotate(${hourDegrees}, 100, 100)`}
          />
          {/* Griff-Kreis */}
          {canDrag && (
            <circle
              cx={100 + hourHandleDistance * Math.sin(hourDegrees * Math.PI / 180)}
              cy={100 - hourHandleDistance * Math.cos(hourDegrees * Math.PI / 180)}
              r="12"
              fill={dragging === 'hour' ? colors.handleHour : colors.hourHand}
              stroke="white"
              strokeWidth="2"
              className={styles.handle}
            />
          )}
        </g>
        
        {/* Mittelpunkt */}
        <circle cx="100" cy="100" r="8" fill={colors.centerOuter} />
        <circle cx="100" cy="100" r="4" fill={colors.centerInner} />
      </svg>
    </div>
  );
}
