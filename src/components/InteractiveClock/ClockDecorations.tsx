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
 * Rendert die Dekorationen basierend auf dem Theme-Typ.
 */
export function ClockDecorations({ type }: { type: 'tower' | 'cuckoo' | 'watch' }) {
  switch (type) {
    case 'tower':
      return <TowerDecorations />;
    case 'cuckoo':
      return <CuckooDecorations />;
    case 'watch':
      return <WatchDecorations />;
    default:
      return null;
  }
}
