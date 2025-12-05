import React, { ReactNode } from 'react';
import styles from './Card.module.css';

/**
 * Props für die Card-Komponente.
 */
interface CardProps {
  children: ReactNode;
  /** Optionaler Titel */
  title?: string;
  /** Optionales Icon/Emoji */
  icon?: string;
  /** Click-Handler für interaktive Karten */
  onClick?: () => void;
  /** Optionale zusätzliche CSS-Klasse */
  className?: string;
}

/**
 * Card-Komponente für Menüeinträge und Inhaltsboxen.
 * 
 * Kann als Button fungieren, wenn ein onClick-Handler übergeben wird.
 */
export function Card({ 
  children, 
  title, 
  icon, 
  onClick, 
  className = '' 
}: CardProps) {
  const Component = onClick ? 'button' : 'div';
  
  const classNames = [
    styles.card,
    onClick ? styles.interactive : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={classNames} 
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </Component>
  );
}
