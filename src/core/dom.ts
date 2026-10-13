// Aides DOM et typographie française.
const NBSP = ' '
const NNBSP = ' '

/** Typographie française : espace insécable avant `: ; ! ?` et dans « guillemets ». Ne touche que les espaces existants. */
export function typo(html: string): string {
  return html
    .replace(/ ([?!;:])/g, `${NNBSP}$1`.replace(NNBSP, NBSP))
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/(\d) (€|h\b|ha\b|km\b|cm\b|%)/g, `$1${NBSP}$2`)
}

export function setHTML(el: Element, html: string): void {
  el.innerHTML = typo(html)
}

/** Chemin vers une page ou une ressource, compatible avec la base GitHub Pages. */
export function href(path = ''): string {
  return `${import.meta.env.BASE_URL}${path}`
}

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T | null => root.querySelector<T>(sel)
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] => Array.from(root.querySelectorAll<T>(sel))

export const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function euro(n: number): string {
  return `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
