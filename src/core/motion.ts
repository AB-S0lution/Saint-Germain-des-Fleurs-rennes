// Mouvement : GSAP (ScrollTrigger + SplitText, gratuits) piloté par Lenis, transitions de page par « pétale ».
// Tout passe par transform / opacity / clip-path. prefers-reduced-motion : état statique, pas de Lenis.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { prefersReducedMotion } from './dom'

gsap.registerPlugin(ScrollTrigger, SplitText)
// Téléphones : la barre d'adresse qui se replie ne doit pas relancer tous les calculs (saut des épinglages).
ScrollTrigger.config({ ignoreMobileResize: true })
export { gsap, ScrollTrigger, SplitText }

export let lenis: Lenis | null = null
const PETAL_IN = 'inset(100% 0% 0% 0% round 50vw 50vw 0px 0px / 18vh 18vh 0px 0px)'
const PETAL_FULL = 'inset(0% 0% 0% 0% round 0vw 0vw 0px 0px / 0vh 0vh 0px 0px)'
const PETAL_OUT = 'inset(0% 0% 100% 0% round 0vw 0vw 50vw 50vw / 0vh 0vh 18vh 18vh)'

export function initScroll(): void {
  if (prefersReducedMotion()) return
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: -72 } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  window.addEventListener('sgf:lock', () => lenis?.stop())
  window.addEventListener('sgf:unlock', () => lenis?.start())
}

export function scrollToTarget(target: Element | number): void {
  if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -72 })
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else target.scrollIntoView({ block: 'start' })
}

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('.site-header')
  if (header) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        header.classList.toggle('is-scrolled', self.scroll() > 40)
        header.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 400 && !document.documentElement.classList.contains('menu-open'))
      },
    })
  }
  const bar = document.querySelector<HTMLElement>('.progress i')
  if (bar && !prefersReducedMotion()) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } })
}

/** Révélations « pousse » : montée depuis la ligne de base, lente à l'entrée, douce à la sortie. */
/** Affiche un élément [data-reveal] sans animation (filet de sécurité). */
function showNow(el: HTMLElement): void {
  gsap.killTweensOf(el)
  gsap.set(el, { opacity: 1, y: 0 })
  el.style.clipPath = 'none'
  el.dataset.revealed = '1'
}

export function initReveals(root: ParentNode = document): void {
  if (prefersReducedMotion()) return
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (!els.length) return
  // Filet de sécurité : tout élément resté masqué 1,6 s après être entré à l'écran est affiché d'office
  // (ScrollTrigger mal recalculé après un filtre, un saut d'ancre ou un changement d'orientation).
  if ('IntersectionObserver' in window) {
    const timers = new Map<Element, number>()
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      const el = en.target as HTMLElement
      if (en.isIntersecting) {
        if (!timers.has(el)) timers.set(el, window.setTimeout(() => { if (!el.dataset.revealed) showNow(el); io.unobserve(el) }, 1600))
      } else {
        window.clearTimeout(timers.get(el)); timers.delete(el)
      }
    }), { rootMargin: '0px 0px -5% 0px' })
    els.forEach((el) => io.observe(el))
  }
  // Et au bout de 4 s, tout ce qui est déjà à l'écran ou au-dessus est visible quoi qu'il arrive.
  window.setTimeout(() => els.forEach((el) => { if (!el.dataset.revealed && el.getBoundingClientRect().top < window.innerHeight) showNow(el) }), 4000)
  window.addEventListener('beforeprint', () => els.forEach(showNow), { once: true })
  // Quand le défilement s'arrête : tout ce qui est à l'écran ou déjà dépassé apparaît (positions
  // ScrollTrigger périmées après un filtre, derniers éléments en bas de page qui n'atteignent jamais 92 %).
  let idle = 0
  const sweep = () => {
    const vh = window.innerHeight
    els.forEach((el) => {
      if (!el.isConnected) return
      // Déjà « révélé » mais resté transparent sans animation en cours (tween interrompu) : on l'affiche.
      if (el.dataset.revealed) { if (!gsap.isTweening(el) && Number(getComputedStyle(el).opacity) < 0.05) showNow(el); return }
      const r = el.getBoundingClientRect()
      if (!r.width && !r.height) return
      if (r.bottom < 0) showNow(el)
      else if (r.top < vh * 0.96) {
        el.dataset.revealed = '1'
        const v: gsap.TweenVars = { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
        if (el.dataset.reveal === 'clip') { v.clipPath = 'inset(0% 0% 0% 0%)'; v.onComplete = () => { el.style.clipPath = 'none' } }
        gsap.to(el, v)
      }
    })
  }
  window.addEventListener('scroll', () => { window.clearTimeout(idle); idle = window.setTimeout(sweep, 450) }, { passive: true })
  // La hauteur de page change (filtres, images, accordéons) : on recalcule les déclencheurs.
  if ('ResizeObserver' in window) {
    let lastH = document.body.scrollHeight
    let t = 0
    new ResizeObserver(() => {
      window.clearTimeout(t)
      t = window.setTimeout(() => {
        const h = document.body.scrollHeight
        if (Math.abs(h - lastH) < 2) return
        lastH = h
        ScrollTrigger.refresh()
        lastH = document.body.scrollHeight
        sweep()
      }, 250)
    }).observe(document.body)
  }
  ScrollTrigger.batch(els, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => {
      // Un saut (ancre, défilement rapide au doigt) lâche des dizaines d'éléments d'un coup :
      // ceux déjà passés au-dessus de l'écran apparaissent sans attendre, et le décalage est plafonné.
      let n = 0
      batch.forEach((el) => {
        ;(el as HTMLElement).dataset.revealed = '1'
        if (el.getBoundingClientRect().bottom < 0) { gsap.set(el, { opacity: 1, y: 0 }); (el as HTMLElement).style.clipPath = 'none'; return }
        const i = Math.min(n++, 5)
        const clip = (el as HTMLElement).dataset.reveal === 'clip'
        const vars: gsap.TweenVars = {
          opacity: 1,
          y: 0,
          duration: clip ? 1.25 : 0.95,
          delay: i * 0.07,
          ease: clip ? 'power3.inOut' : 'power3.out',
          overwrite: 'auto',
        }
        // clearProps rendrait la main à la règle CSS `.js-motion [data-reveal="clip"]` (masque fermé) : on fige l'état ouvert.
        if (clip) { vars.clipPath = 'inset(0% 0% 0% 0%)'; vars.onComplete = () => { (el as HTMLElement).style.clipPath = 'none' } }
        gsap.to(el, vars)
      })
    },
  })
}

/** Met en pause les boucles CSS (tige qui se balance, défilé de témoignages) hors de l'écran. */
export function initOffscreenPause(root: ParentNode = document): void {
  if (!('IntersectionObserver' in window)) return
  const io = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle('is-offscreen', !en.isIntersecting)))
  root.querySelectorAll('.hero, .marquee-sec').forEach((el) => io.observe(el))
}

/** Titres découpés en lignes, révélés par un masque (SplitText). */
export function initSplit(root: ParentNode = document): void {
  if (prefersReducedMotion()) return
  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    gsap.set(el, { visibility: 'visible' })
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      linesClass: 'split-line',
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 108,
          rotation: 2.5,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }),
    })
  })
}

/** Boutons magnétiques : léger déplacement vers le pointeur fin. */
export function initMagnetic(root: ParentNode = document): void {
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  root.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * 0.28)
      y((e.clientY - (r.top + r.height / 2)) * 0.34)
    })
    el.addEventListener('pointerleave', () => { x(0); y(0) })
  })
}

/** Texte qui passe de 0 à n (statistiques réelles uniquement). */
export function initCounters(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count)
    const suffix = el.dataset.suffix ?? ''
    if (prefersReducedMotion() || Number.isNaN(end)) return
    const o = { v: 0 }
    gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = `${Math.round(o.v)}${suffix}`), scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
  })
}

/** Sortie : le « pétale » monte, puis on navigue. Entrée : il se retire par le haut. */
export function initTransitions(): void {
  const wipe = document.querySelector<HTMLElement>('.wipe')
  if (!wipe || prefersReducedMotion()) return
  gsap.set(wipe, { clipPath: PETAL_IN })
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]')
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return
    const url = new URL(a.href, location.href)
    if (url.origin !== location.origin || url.pathname === location.pathname) return
    if (!url.pathname.startsWith(import.meta.env.BASE_URL)) return
    e.preventDefault()
    try { sessionStorage.setItem('sgf-t', '1') } catch { /* ignoré */ }
    window.dispatchEvent(new Event('sgf:lock'))
    gsap.set(wipe, { visibility: 'visible' })
    gsap.fromTo(wipe, { clipPath: PETAL_IN }, { clipPath: PETAL_FULL, duration: 0.62, ease: 'power3.inOut', onComplete: () => { location.href = url.href } })
  })
  window.addEventListener('pageshow', (ev) => {
    if (ev.persisted) {
      document.documentElement.classList.remove('is-entering')
      gsap.set(wipe, { clipPath: PETAL_IN, visibility: 'hidden' })
      window.dispatchEvent(new Event('sgf:unlock'))
    }
  })
}

export function enterTransition(): void {
  const root = document.documentElement
  const wipe = document.querySelector<HTMLElement>('.wipe')
  if (!root.classList.contains('is-entering') || !wipe) {
    root.classList.remove('is-entering')
    return
  }
  gsap.set(wipe, { clipPath: PETAL_FULL, visibility: 'visible' })
  root.classList.remove('is-entering')
  gsap.to(wipe, { clipPath: PETAL_OUT, duration: 0.85, delay: 0.08, ease: 'power3.inOut', onComplete: () => { gsap.set(wipe, { visibility: 'hidden' }) } })
  try { sessionStorage.removeItem('sgf-t') } catch { /* ignoré */ }
}
