/**
 * Theme-Definitionen für die interaktive Uhr.
 */

/** Farbschema eines Uhr-Themes */
export interface ClockThemeColors {
  outerRing: string;
  outerRingStroke: string;
  faceGradientStart: string;
  faceGradientEnd: string;
  hourMarker: string;
  minuteMarker: string;
  numbers: string;
  hourHand: string;
  minuteHand: string;
  centerOuter: string;
  centerInner: string;
  handleHour: string;
  handleMinute: string;
}

/** Vollständige Theme-Definition */
export interface ClockTheme {
  name: string;
  icon: string;
  description: string;
  colors: ClockThemeColors;
  decorations: 'tower' | 'cuckoo' | 'watch' | 'learning';
  useRomanNumerals: boolean;
}

/** Verfügbare Theme-IDs */
export type ClockThemeId = 'tower' | 'cuckoo' | 'watch' | 'learning';

/** Alle verfügbaren Uhr-Themes */
export const CLOCK_THEMES: Record<ClockThemeId, ClockTheme> = {
  tower: {
    name: 'Turmuhr',
    icon: '🏰',
    description: 'Mittelalterliche Turmuhr',
    colors: {
      outerRing: '#4a3728',
      outerRingStroke: '#2d1f14',
      faceGradientStart: '#f5e6d3',
      faceGradientEnd: '#d4b896',
      hourMarker: '#2d1f14',
      minuteMarker: '#6b5344',
      numbers: '#2d1f14',
      hourHand: '#2d1f14',
      minuteHand: '#8b0000',
      centerOuter: '#2d1f14',
      centerInner: '#8b0000',
      handleHour: '#2d1f14',
      handleMinute: '#8b0000',
    },
    decorations: 'tower',
    useRomanNumerals: true,
  },
  cuckoo: {
    name: 'Kuckucksuhr',
    icon: '🐦',
    description: 'Traditionelle Kuckucksuhr',
    colors: {
      outerRing: '#5d4037',
      outerRingStroke: '#3e2723',
      faceGradientStart: '#fff8e1',
      faceGradientEnd: '#ffe0b2',
      hourMarker: '#3e2723',
      minuteMarker: '#8d6e63',
      numbers: '#3e2723',
      hourHand: '#3e2723',
      minuteHand: '#1b5e20',
      centerOuter: '#3e2723',
      centerInner: '#1b5e20',
      handleHour: '#3e2723',
      handleMinute: '#2e7d32',
    },
    decorations: 'cuckoo',
    useRomanNumerals: false,
  },
  watch: {
    name: 'Armbanduhr',
    icon: '⌚',
    description: 'Moderne Armbanduhr',
    colors: {
      outerRing: '#37474f',
      outerRingStroke: '#263238',
      faceGradientStart: '#ffffff',
      faceGradientEnd: '#e3f2fd',
      hourMarker: '#263238',
      minuteMarker: '#90a4ae',
      numbers: '#263238',
      hourHand: '#263238',
      minuteHand: '#1976d2',
      centerOuter: '#263238',
      centerInner: '#1976d2',
      handleHour: '#263238',
      handleMinute: '#1976d2',
    },
    decorations: 'watch',
    useRomanNumerals: false,
  },
  learning: {
    name: 'Lernuhr',
    icon: '🎓',
    description: 'Bunte Lernuhr mit Minuten',
    colors: {
      outerRing: '#ffffff',
      outerRingStroke: '#e0e0e0',
      faceGradientStart: '#ffffff',
      faceGradientEnd: '#ffffff',
      hourMarker: '#333333',
      minuteMarker: '#666666',
      numbers: '#ffffff',
      hourHand: '#1a1a1a',
      minuteHand: '#1a1a1a',
      centerOuter: '#ffffff',
      centerInner: '#e53935',
      handleHour: '#333333',
      handleMinute: '#e53935',
    },
    decorations: 'learning',
    useRomanNumerals: false,
  },
};

/** Römische Ziffern für die Turmuhr */
export const ROMAN_NUMERALS: Record<number, string> = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
  7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII',
};
