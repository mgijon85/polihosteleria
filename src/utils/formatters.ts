import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to Spanish Euro format: 1.234,56 €
 */
export function formatMoney(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0,00 €';
  }
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    useGrouping: 'always' as any,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a number to Spanish integer or decimal: 1.234
 */
export function formatNumber(n: number | undefined | null, decimals: number = 0): string {
  if (n === undefined || n === null || isNaN(n)) {
    return '0';
  }
  return new Intl.NumberFormat('es-ES', {
    useGrouping: 'always' as any,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * Formats a percentage: 21,5 %
 */
export function formatPercent(p: number | undefined | null): string {
  if (p === undefined || p === null || isNaN(p)) {
    return '0 %';
  }
  return `${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(p)} %`;
}

/**
 * Formats date into Spanish short format: "jue 22 oct" or similar
 */
export function formatDate(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return '-';
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return dateInput.toString();

  const dayName = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(d);
  const day = d.getDate();
  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(d);
  
  // Format: "jue 22 oct"
  return `${dayName} ${day} ${monthName}`;
}

/**
 * Formats time: "23:40"
 */
export function formatTime(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return '-';
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) {
    // If it's already a time string like "09:30" or "23:40"
    if (typeof dateInput === 'string' && dateInput.includes(':') && dateInput.length <= 8) {
      return dateInput.slice(0, 5);
    }
    return dateInput.toString();
  }
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
}
