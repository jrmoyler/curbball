import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Reads all coin buckets from localStorage and returns the net total.
 * Coins are stored per-difficulty (easy/medium/hard), plus a bonus bucket
 * and a spent bucket that records coin-purchases.
 */
export function loadTotalCoins(): number {
  const easy   = parseInt(localStorage.getItem('game-coins-easy')   || '0');
  const medium = parseInt(localStorage.getItem('game-coins-medium') || '0');
  const hard   = parseInt(localStorage.getItem('game-coins-hard')   || '0');
  const bonus  = parseInt(localStorage.getItem('game-coins-bonus')  || '0');
  const spent  = parseInt(localStorage.getItem('game-coins-spent')  || '0');
  return Math.max(0, easy + medium + hard + bonus - spent);
}

/**
 * Capitalises each hyphen-separated word in a kebab-case id.
 * e.g. "golden-ball" → "Golden Ball"
 */
export function formatKebabLabel(id: string): string {
  return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
