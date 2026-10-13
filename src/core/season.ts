// Le calendrier vivant : le mois courant pilote l'accent, la fleur du hero et les catalogues.
import { MOIS } from '../data/months'

export type SaisonKey = 'renoncule' | 'pivoine' | 'hortensia' | 'dahlia' | 'ellebore'

const KEY = 'sgf-mois'

/** Mois affiché : paramètre ?mois=, sinon choix mémorisé, sinon mois réel. */
export function currentMonth(): number {
  try {
    const q = new URLSearchParams(location.search).get('mois')
    if (q && +q >= 1 && +q <= 12) return Math.round(+q)
    const s = localStorage.getItem(KEY)
    if (s && +s >= 1 && +s <= 12) return Math.round(+s)
  } catch {
    /* stockage indisponible : on retombe sur le mois réel */
  }
  return new Date().getMonth() + 1
}

export const realMonth = (): number => new Date().getMonth() + 1

export function isOverridden(): boolean {
  return currentMonth() !== realMonth()
}

export function setMonthOverride(m: number | null): void {
  try {
    if (m === null) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, String(m))
  } catch {
    /* ignoré */
  }
}

/** Accent saisonnier : renoncule au printemps, pivoine mai et juin, hortensia l'été, dahlia l'automne, ellébore l'hiver. */
export function saisonOf(m: number): SaisonKey {
  if (m === 3 || m === 4) return 'renoncule'
  if (m === 5 || m === 6) return 'pivoine'
  if (m >= 7 && m <= 9) return 'hortensia'
  if (m === 10 || m === 11) return 'dahlia'
  return 'ellebore'
}

/** Fleur vedette de chaque mois (hero et pages). */
const VEDETTE = ['ellebore', 'anemone', 'renoncule', 'tulipe', 'pivoine', 'pivoine', 'hortensia', 'zinnia', 'dahlia', 'dahlia', 'chrysantheme', 'houx']
export const flowerOfMonth = (m: number): string => VEDETTE[m - 1]

export const moisNom = (m: number): string => MOIS[m - 1]

export const inSeason = (mois: number[], m: number): boolean => mois.includes(m)

export function applySeason(): { m: number; saison: SaisonKey } {
  const m = currentMonth()
  const saison = saisonOf(m)
  document.documentElement.dataset.saison = saison
  return { m, saison }
}

/** Couleurs d'accent par saison, pour les accents locaux (roue des mois). [remplissage, texte clair, texte sombre] */
export const SAISON_TOKENS: Record<SaisonKey, [string, string, string]> = {
  renoncule: ['#d9572b', '#b0421c', '#f08a62'],
  pivoine: ['#d88a9a', '#9c3e55', '#eaa5b4'],
  hortensia: ['#6c7fb0', '#3e4f86', '#a3b3e2'],
  dahlia: ['#7a2e3a', '#7a2e3a', '#e08e9b'],
  ellebore: ['#5e6f4e', '#4a5a3c', '#a4b98f'],
}

/** « de mars », « d’avril » : élision devant une voyelle. */
export const deMois = (m: number): string => (/^[aeiouhéèô]/i.test(MOIS[m - 1]) ? 'd’' : 'de ') + MOIS[m - 1]
