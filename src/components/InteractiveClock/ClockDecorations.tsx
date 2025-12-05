import React from 'react';

/**
 * Dekorationen für die mittelalterliche Turmuhr.
 */
export function TowerDecorations() {
  return (
    <g>
      {/* Steinmauer-Textur am Rand */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        return (
          <rect
            key={`stone-${i}`}
            x={100 + 94 * Math.cos(angle) - 4}
            y={100 + 94 * Math.sin(angle) - 3}
            width="8"
            height="6"
            fill="#5d4037"
            opacity="0.3"
            rx="1"
          />
        );
      })}
      {/* Gotische Verzierungen */}
      <path d="M100 8 L103 14 L100 12 L97 14 Z" fill="#4a3728" />
      <path d="M100 192 L103 186 L100 188 L97 186 Z" fill="#4a3728" />
      {/* Kleine Türmchen-Andeutungen */}
      <circle cx="100" cy="6" r="3" fill="#6d4c41" />
      <circle cx="100" cy="194" r="3" fill="#6d4c41" />
    </g>
  );
}

/**
 * Dekorationen für die Kuckucksuhr.
 */
export function CuckooDecorations() {
  return (
    <g>
      {/* Holzmaserung */}
      <ellipse cx="70" cy="50" rx="15" ry="3" fill="#8d6e63" opacity="0.2" />
      <ellipse cx="130" cy="70" rx="12" ry="2" fill="#8d6e63" opacity="0.2" />
      <ellipse cx="80" cy="140" rx="18" ry="3" fill="#8d6e63" opacity="0.2" />
      
      {/* Blätter-Dekoration oben */}
      <g transform="translate(100, 12)">
        <ellipse cx="-12" cy="0" rx="6" ry="3" fill="#2e7d32" transform="rotate(-30)" />
        <ellipse cx="12" cy="0" rx="6" ry="3" fill="#2e7d32" transform="rotate(30)" />
        <ellipse cx="0" cy="-4" rx="5" ry="3" fill="#388e3c" />
      </g>
      
      {/* Kleine Vögel */}
      <g transform="translate(22, 100)">
        <ellipse cx="0" cy="0" rx="4" ry="3" fill="#ff8f00" />
        <circle cx="-3" cy="-1" r="2" fill="#ff8f00" />
        <path d="M-5 -1 L-8 0 L-5 1" fill="#e65100" />
      </g>
      <g transform="translate(178, 100) scale(-1, 1)">
        <ellipse cx="0" cy="0" rx="4" ry="3" fill="#ff8f00" />
        <circle cx="-3" cy="-1" r="2" fill="#ff8f00" />
        <path d="M-5 -1 L-8 0 L-5 1" fill="#e65100" />
      </g>
      
      {/* Eicheln unten */}
      <g transform="translate(85, 188)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="#8d6e63" />
        <rect x="-3" y="-7" width="6" height="3" fill="#5d4037" rx="1" />
      </g>
      <g transform="translate(115, 188)">
        <ellipse cx="0" cy="0" rx="4" ry="5" fill="#8d6e63" />
        <rect x="-3" y="-7" width="6" height="3" fill="#5d4037" rx="1" />
      </g>
    </g>
  );
}

/**
 * Dekorationen für die moderne Armbanduhr.
 */
export function WatchDecorations() {
  return (
    <g>
      {/* Uhrengehäuse-Glanz */}
      <ellipse 
        cx="60" cy="40" rx="20" ry="10" 
        fill="white" opacity="0.15"
        transform="rotate(-45, 60, 40)"
      />
      
      {/* Krone (Aufzugskrone) */}
      <g transform="translate(194, 100)">
        <rect x="0" y="-4" width="6" height="8" fill="#455a64" rx="1" />
        <rect x="2" y="-6" width="4" height="12" fill="#546e7a" rx="1" />
        <line x1="3" y1="-5" x2="3" y2="5" stroke="#37474f" strokeWidth="0.5" />
        <line x1="5" y1="-5" x2="5" y2="5" stroke="#37474f" strokeWidth="0.5" />
      </g>
      
      {/* Markenname-Bereich */}
      <text
        x="100" y="65"
        textAnchor="middle"
        style={{ fontSize: '6px', fontWeight: 'bold', fill: '#1976d2', letterSpacing: '1px' }}
      >
        CHRONO
      </text>
      
      {/* Datumsanzeige */}
      <rect x="125" y="96" width="14" height="10" fill="white" stroke="#90a4ae" strokeWidth="0.5" rx="1" />
      <text
        x="132" y="103"
        textAnchor="middle"
        style={{ fontSize: '6px', fontWeight: 'bold', fill: '#263238' }}
      >
        {new Date().getDate()}
      </text>
    </g>
  );
}

/**
 * Farben für die 12 Stundensegmente der Lernuhr.
 * Jedes Segment hat eine helle und dunkle Variante für den 3D-Effekt.
 */
const LEARNING_CLOCK_COLORS = [
  { light: '#ef5350', dark: '#c62828' },   // 12 - Rot
  { light: '#ff7043', dark: '#e64a19' },   // 1 - Orange
  { light: '#ffb74d', dark: '#f57c00' },   // 2 - Gelb-Orange
  { light: '#fff176', dark: '#fbc02d' },   // 3 - Gelb
  { light: '#dce775', dark: '#afb42b' },   // 4 - Gelbgrün
  { light: '#aed581', dark: '#689f38' },   // 5 - Hellgrün
  { light: '#81c784', dark: '#388e3c' },   // 6 - Grün
  { light: '#4db6ac', dark: '#00897b' },   // 7 - Türkis
  { light: '#4fc3f7', dark: '#0288d1' },   // 8 - Hellblau
  { light: '#9575cd', dark: '#512da8' },   // 9 - Violett
  { light: '#ba68c8', dark: '#7b1fa2' },   // 10 - Lila
  { light: '#f06292', dark: '#c2185b' },   // 11 - Pink
];

/**
 * Erzeugt einen SVG-Pfad für ein Kreissegment.
 */
function createArcPath(
  cx: number, cy: number,
  innerR: number, outerR: number,
  startAngle: number, endAngle: number
): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1Inner = cx + innerR * Math.cos(startRad);
  const y1Inner = cy + innerR * Math.sin(startRad);
  const x1Outer = cx + outerR * Math.cos(startRad);
  const y1Outer = cy + outerR * Math.sin(startRad);
  const x2Inner = cx + innerR * Math.cos(endRad);
  const y2Inner = cy + innerR * Math.sin(endRad);
  const x2Outer = cx + outerR * Math.cos(endRad);
  const y2Outer = cy + outerR * Math.sin(endRad);

  return `
    M ${x1Inner} ${y1Inner}
    L ${x1Outer} ${y1Outer}
    A ${outerR} ${outerR} 0 0 1 ${x2Outer} ${y2Outer}
    L ${x2Inner} ${y2Inner}
    A ${innerR} ${innerR} 0 0 0 ${x1Inner} ${y1Inner}
    Z
  `;
}

/**
 * Dekorationen für die Lernuhr - originalgetreue Nachbildung.
 * Features:
 * - Minutenring außen mit weißen Kästchen und farbigen Zahlen
 * - Farbige Stundensegmente (zweigeteilt hell/dunkel)
 * - Große weiße 12-Stunden-Zahlen auf den Segmenten
 * - 24-Stunden-Zahlen im inneren weißen Bereich
 */
export function LearningClockDecorations() {
  const cx = 100;
  const cy = 100;

  // Radien
  const outerRadius = 98;
  const minuteRingOuter = 98;
  const minuteRingInner = 85;
  const hourSegmentOuter = 85;
  const hourSegmentInner = 38;
  const hour24Radius = 48;
  const innerCircleRadius = 30;

  // Farbige Minutenring-Segmente (Hintergrund für Minutenzahlen)
  const minuteRingSegments = Array.from({ length: 12 }, (_, i) => {
    const startAngle = i * 30;
    const endAngle = (i + 1) * 30;
    return (
      <path
        key={`minute-ring-${i}`}
        d={createArcPath(cx, cy, minuteRingInner, minuteRingOuter, startAngle, endAngle)}
        fill={LEARNING_CLOCK_COLORS[i].light}
      />
    );
  });

  // Weiße Kästchen für Minutenzahlen
  const minuteBoxes = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180);
    const radius = 91.5;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const rotation = i * 6;

    return (
      <rect
        key={`minute-box-${i}`}
        x={x - 4.5}
        y={y - 5}
        width="9"
        height="10"
        rx="2"
        fill="white"
        transform={`rotate(${rotation}, ${x}, ${y})`}
      />
    );
  });

  // Minutenzahlen
  const minuteNumbers = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180);
    const radius = 91.5;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const segmentIndex = Math.floor(i / 5);
    const color = LEARNING_CLOCK_COLORS[segmentIndex].dark;

    return (
      <text
        key={`minute-num-${i}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '6px',
          fontWeight: 'bold',
          fill: color,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {i}
      </text>
    );
  });

  // Farbige Stundensegmente (zweigeteilt: außen hell, innen dunkel)
  const hourSegments = Array.from({ length: 12 }, (_, i) => {
    const startAngle = i * 30;
    const endAngle = (i + 1) * 30;
    const midRadius = (hourSegmentOuter + hourSegmentInner) / 2 + 5;

    return (
      <g key={`hour-segment-${i}`}>
        {/* Äußerer heller Teil */}
        <path
          d={createArcPath(cx, cy, midRadius, hourSegmentOuter, startAngle, endAngle)}
          fill={LEARNING_CLOCK_COLORS[i].light}
        />
        {/* Innerer dunkler Teil */}
        <path
          d={createArcPath(cx, cy, hourSegmentInner, midRadius, startAngle, endAngle)}
          fill={LEARNING_CLOCK_COLORS[i].dark}
        />
      </g>
    );
  });

  // Große weiße 12-Stunden-Zahlen
  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const radius = 64;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    return (
      <text
        key={`hour-${num}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          fill: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {num}
      </text>
    );
  });

  // 24-Stunden-Zahlen im inneren weißen Bereich
  const hour24Numbers = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((num, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = cx + hour24Radius * Math.cos(angle);
    const y = cy + hour24Radius * Math.sin(angle);

    return (
      <text
        key={`hour24-${num}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '9px',
          fontWeight: 'normal',
          fill: LEARNING_CLOCK_COLORS[i].dark,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {num}
      </text>
    );
  });

  return (
    <g>
      {/* Weiße Basis */}
      <circle cx={cx} cy={cy} r={outerRadius} fill="white" />

      {/* Farbige Minutenring-Segmente */}
      {minuteRingSegments}

      {/* Weiße Kästchen für Minuten */}
      {minuteBoxes}

      {/* Minutenzahlen */}
      {minuteNumbers}

      {/* Farbige Stundensegmente */}
      {hourSegments}

      {/* Weißer Innenkreis für 24h-Zahlen */}
      <circle cx={cx} cy={cy} r={innerCircleRadius} fill="white" />

      {/* 12-Stunden-Zahlen */}
      {hourNumbers}

      {/* 24-Stunden-Zahlen */}
      {hour24Numbers}
    </g>
  );
}

/**
 * Rendert die Dekorationen basierend auf dem Theme-Typ.
 */
export function ClockDecorations({ type }: { type: 'tower' | 'cuckoo' | 'watch' | 'learning' }) {
  switch (type) {
    case 'tower':
      return <TowerDecorations />;
    case 'cuckoo':
      return <CuckooDecorations />;
    case 'watch':
      return <WatchDecorations />;
    case 'learning':
      return <LearningClockDecorations />;
    default:
      return null;
  }
}
