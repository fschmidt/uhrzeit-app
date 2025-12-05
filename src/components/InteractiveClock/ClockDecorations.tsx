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

/** Farben für die 12 Stundensegmente der Lernuhr (Regenbogen) */
const LEARNING_CLOCK_SEGMENT_COLORS = [
  '#e53935', // 12 - Rot
  '#ff7043', // 1 - Orange
  '#ffb300', // 2 - Gelb-Orange
  '#fdd835', // 3 - Gelb
  '#c0ca33', // 4 - Gelbgrün
  '#7cb342', // 5 - Hellgrün
  '#43a047', // 6 - Grün
  '#00897b', // 7 - Türkis
  '#039be5', // 8 - Hellblau
  '#5e35b1', // 9 - Violett
  '#8e24aa', // 10 - Lila
  '#d81b60', // 11 - Pink
];

/**
 * Dekorationen für die Lernuhr mit farbigen Segmenten und Minutenring.
 */
export function LearningClockDecorations() {
  const centerX = 100;
  const centerY = 100;

  // Radien für verschiedene Bereiche
  const outerRadius = 98;
  const minuteRingInner = 85;
  const hourSegmentOuter = 85;
  const hourSegmentInner = 45;
  const hour24Radius = 52;

  // Erstelle die 12 farbigen Stundensegmente
  const hourSegments = Array.from({ length: 12 }, (_, i) => {
    const startAngle = (i * 30 - 90) * (Math.PI / 180);
    const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);

    const x1Inner = centerX + hourSegmentInner * Math.cos(startAngle);
    const y1Inner = centerY + hourSegmentInner * Math.sin(startAngle);
    const x1Outer = centerX + hourSegmentOuter * Math.cos(startAngle);
    const y1Outer = centerY + hourSegmentOuter * Math.sin(startAngle);
    const x2Inner = centerX + hourSegmentInner * Math.cos(endAngle);
    const y2Inner = centerY + hourSegmentInner * Math.sin(endAngle);
    const x2Outer = centerX + hourSegmentOuter * Math.cos(endAngle);
    const y2Outer = centerY + hourSegmentOuter * Math.sin(endAngle);

    const pathD = `
      M ${x1Inner} ${y1Inner}
      L ${x1Outer} ${y1Outer}
      A ${hourSegmentOuter} ${hourSegmentOuter} 0 0 1 ${x2Outer} ${y2Outer}
      L ${x2Inner} ${y2Inner}
      A ${hourSegmentInner} ${hourSegmentInner} 0 0 0 ${x1Inner} ${y1Inner}
      Z
    `;

    return (
      <path
        key={`segment-${i}`}
        d={pathD}
        fill={LEARNING_CLOCK_SEGMENT_COLORS[i]}
      />
    );
  });

  // Erstelle den Minutenring mit Zahlen 0-59
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180);
    const isMultipleOf5 = i % 5 === 0;
    const textRadius = 91;

    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);

    // Hintergrundfarbe basierend auf dem Stundensegment
    const segmentIndex = Math.floor(i / 5);
    const bgColor = LEARNING_CLOCK_SEGMENT_COLORS[segmentIndex];

    return (
      <g key={`minute-${i}`}>
        {/* Hintergrund-Box für Minutenzahl */}
        <rect
          x={x - 5}
          y={y - 4}
          width="10"
          height="8"
          fill={bgColor}
          rx="1"
        />
        {/* Minutenzahl */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: isMultipleOf5 ? '5px' : '4px',
            fontWeight: isMultipleOf5 ? 'bold' : 'normal',
            fill: 'white',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {i}
        </text>
      </g>
    );
  });

  // 12-Stunden-Zahlen (große weiße Zahlen)
  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const radius = 68;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return (
      <text
        key={`hour-${num}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fill: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {num}
      </text>
    );
  });

  // 24-Stunden-Zahlen (kleinere Zahlen innen: 13-23 und 0)
  const hour24Numbers = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((num, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = centerX + hour24Radius * Math.cos(angle);
    const y = centerY + hour24Radius * Math.sin(angle);

    return (
      <text
        key={`hour24-${num}`}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '8px',
          fontWeight: 'normal',
          fill: LEARNING_CLOCK_SEGMENT_COLORS[i],
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
      <circle cx={centerX} cy={centerY} r={outerRadius} fill="white" />

      {/* Minutenring-Hintergrund */}
      <circle cx={centerX} cy={centerY} r={outerRadius} fill="none" stroke="#f5f5f5" strokeWidth="13" />

      {/* Farbige Stundensegmente */}
      {hourSegments}

      {/* Trennlinien zwischen Segmenten */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = centerX + hourSegmentInner * Math.cos(angle);
        const y1 = centerY + hourSegmentInner * Math.sin(angle);
        const x2 = centerX + hourSegmentOuter * Math.cos(angle);
        const y2 = centerY + hourSegmentOuter * Math.sin(angle);
        return (
          <line
            key={`divider-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth="1"
          />
        );
      })}

      {/* Weißer Innenkreis */}
      <circle cx={centerX} cy={centerY} r={hourSegmentInner} fill="white" />

      {/* Minutenmarkierungen und -zahlen */}
      {minuteMarkers}

      {/* Stundenzahlen */}
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
