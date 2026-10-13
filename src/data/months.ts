// Utilitaires de calendrier partagés par les jeux de données (code, pas de données d'exemple).
export const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'] as const
export const MOIS_COURTS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'] as const

/** Plage de mois (1 à 12), avec passage d'une année à l'autre : r(11, 2) = [11, 12, 1, 2]. */
export function r(from: number, to: number): number[] {
  const out: number[] = []
  let m = from
  for (let i = 0; i < 12; i++) {
    out.push(m)
    if (m === to) break
    m = m === 12 ? 1 : m + 1
  }
  return out
}

export const TOUTE_ANNEE = r(1, 12)

/** Prochain mois (après `from`) où `mois` contient une disponibilité. */
export function prochainMois(mois: number[], from: number): number {
  for (let i = 1; i <= 12; i++) {
    const m = ((from - 1 + i) % 12) + 1
    if (mois.includes(m)) return m
  }
  return from
}
