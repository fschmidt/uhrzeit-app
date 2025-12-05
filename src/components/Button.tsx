import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

/**
 * Button-Varianten für verschiedene Anwendungsfälle.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

/**
 * Button-Größen.
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props für die Button-Komponente.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visueller Stil des Buttons */
  variant?: ButtonVariant;
  /** Größe des Buttons */
  size?: ButtonSize;
  /** Volle Breite */
  fullWidth?: boolean;
}

/**
 * Wiederverwendbare Button-Komponente.
 * 
 * Unterstützt verschiedene Varianten und Größen für unterschiedliche
 * Anwendungsfälle in der Lern-App.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classNames} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
