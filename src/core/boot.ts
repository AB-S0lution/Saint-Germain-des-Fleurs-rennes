// Démarrage d'une page : saison, gabarit, mouvement, puis logique propre à la page.
import '../style.css'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/instrument-sans'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import { setHTML, prefersReducedMotion } from './dom'
import { applySeason, type SaisonKey } from './season'
import { headerHTML, footerHTML, initMenu } from './layout'
import * as motion from './motion'

export interface Ctx {
  id: string
  reduced: boolean
  month: number
  saison: SaisonKey
  main: HTMLElement
}

export function bootPage(id: string, build: (ctx: { month: number; saison: SaisonKey }) => string, init?: (ctx: Ctx) => void): void {
  const reduced = prefersReducedMotion()
  const { m, saison } = applySeason()
  const app = document.getElementById('app')
  if (!app) return
  setHTML(app, `${headerHTML(id)}<main id="contenu" tabindex="-1">${build({ month: m, saison })}</main>${footerHTML()}`)
  const main = document.getElementById('contenu') as HTMLElement
  initMenu()
  const ctx: Ctx = { id, reduced, month: m, saison, main }
  // Signale au script de secours (dans chaque HTML) que le module a bien démarré.
  document.documentElement.classList.add('motion-ready')
  try {
    motion.initScroll()
    motion.initHeader()
    motion.initTransitions()
    init?.(ctx)
    motion.initSplit(document)
    motion.initReveals(document)
    motion.initMagnetic(document)
    motion.initCounters(document)
    motion.initOffscreenPause(document)
    motion.enterTransition()
    const refresh = () => motion.ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh, { once: true })
  } catch (err) {
    // Si le mouvement échoue, on affiche le contenu statique plutôt qu'une page vide.
    console.error('[mouvement]', err)
    document.documentElement.classList.remove('js-motion', 'is-entering')
  }
}
