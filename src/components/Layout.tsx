import React, { ReactNode } from 'react';
import styles from './Layout.module.css';

/**
 * Props für die Layout-Komponente.
 */
interface LayoutProps {
  children: ReactNode;
  /** Optionaler Titel für die Seite */
  title?: string;
  /** Zentrierung des Inhalts */
  centered?: boolean;
  /** Optionale zusätzliche CSS-Klasse */
  className?: string;
}

/**
 * Layout-Komponente als Wrapper für alle Screens.
 * 
 * Stellt ein konsistentes Layout mit optionalem Titel
 * und zentriertem Inhalt bereit.
 */
export function Layout({ 
  children, 
  title, 
  centered = true,
  className = '' 
}: LayoutProps) {
  const contentClasses = [
    styles.content,
    centered ? styles.centered : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.layout}>
      <div className={styles.background} />
      <main className={contentClasses}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </main>
    </div>
  );
}
