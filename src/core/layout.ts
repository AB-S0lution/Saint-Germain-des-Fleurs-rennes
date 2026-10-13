// Gabarit commun : en-tête, menu plein écran, pied de page.
import { SITE, hours } from '../data/site'
import { href, typo } from './dom'
import { PAGES, NAV_PRIMARY, pageById } from './pages'
import { currentMonth, flowerOfMonth, moisNom } from './season'
import { flowerById } from '../data/flowers'
import { markSVG } from './art'

export function headerHTML(active: string): string {
  const m = currentMonth()
  const links = NAV_PRIMARY.map((id) => {
    const p = pageById(id)
    return `<a class="nav-link" href="${href(p.file)}"${p.id === active ? ' aria-current="page"' : ''}>${p.court ?? p.label}</a>`
  }).join('')
  return typo(`
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="site-header" id="top">
  <div class="wrap header-in">
    <a class="brand" href="${href('index.html')}" aria-label="${SITE.nom}, accueil">${markSVG()}<span class="brand-name">Saint Germain<br class="br-s"> des Fleurs</span></a>
    <nav class="nav-inline" aria-label="Navigation principale">${links}</nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span class="menu-lines" aria-hidden="true"><i></i><i></i></span><span class="menu-label">Menu</span></button>
  </div>
  <div class="progress" aria-hidden="true"><i></i></div>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu du site" hidden>
  <div class="wrap menu-in">
    <p class="menu-season">Ce mois-ci : <strong>${moisNom(m)}</strong>, ${flowerById(flowerOfMonth(m)).nom.toLowerCase()}.</p>
    <ul class="menu-list">${PAGES.slice(0, 14).map((p, i) => `<li style="--i:${i}"><a href="${href(p.file)}"${p.id === active ? ' aria-current="page"' : ''}><span class="mask"><span>${p.label}</span></span></a></li>`).join('')}</ul>
    <p class="menu-foot"><a href="${SITE.telHref}">${SITE.tel}</a><a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</div>`)
}

export function footerHTML(): string {
  const open = hours.filter((h) => h.ouvert)
  return typo(`
<footer class="site-footer">
  <div class="wrap">
    <p class="foot-big" aria-hidden="true">Saint Germain<br>des Fleurs</p>
    <div class="foot-grid">
      <div>
        <h2 class="foot-h">La boutique</h2>
        <address>${SITE.adresse.rue}<br>${SITE.adresse.cp} ${SITE.adresse.ville}<br><a href="${SITE.mapsUrl}" rel="noopener" target="_blank">Ouvrir le plan</a></address>
        <p class="foot-note">La boutique de ville d’une ferme florale à Plouézec.</p>
      </div>
      <div>
        <h2 class="foot-h">Horaires</h2>
        <ul class="foot-hours">${open.map((h) => `<li><span>${h.jour.slice(0, 3)}.</span><span>${h.debut?.replace(':00', ' h')} à ${h.fin?.replace(':00', ' h')}${h.note ? '*' : ''}</span></li>`).join('')}</ul>
        <p class="foot-note">Fermé le lundi. *À confirmer.</p>
      </div>
      <div>
        <h2 class="foot-h">Commander</h2>
        <p><a href="${SITE.telHref}">${SITE.tel}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a><br><a href="${SITE.instagramUrl}" rel="noopener" target="_blank">@${SITE.instagram}</a></p>
      </div>
      <nav aria-label="Pied de page">
        <h2 class="foot-h">Le site</h2>
        <ul class="foot-links">${PAGES.filter((p) => ['composer', 'bouquets', 'saisons', 'journal', 'faq', 'mentions', 'confidentialite'].includes(p.id)).map((p) => `<li><a href="${href(p.file)}">${p.label}</a></li>`).join('')}</ul>
      </nav>
    </div>
    <p class="foot-demo">Maquette de démonstration, non officielle : catalogue, prix, articles et témoignages sont des exemples. Les faits de la boutique (adresse, téléphone, horaires, histoire) viennent de sources publiques.</p>
  </div>
</footer>
<div class="wipe" aria-hidden="true"></div>`)
}

export function initMenu(): void {
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn')
  const menu = document.getElementById('menu')
  if (!btn || !menu) return
  const links = () => Array.from(menu.querySelectorAll<HTMLElement>('a'))
  let closeTimer = 0
  const open = () => {
    window.clearTimeout(closeTimer)
    menu.hidden = false
    requestAnimationFrame(() => document.documentElement.classList.add('menu-open'))
    btn.setAttribute('aria-expanded', 'true')
    btn.querySelector('.menu-label')!.textContent = 'Fermer'
    window.setTimeout(() => links()[0]?.focus(), 60)
    window.dispatchEvent(new Event('sgf:lock'))
  }
  const close = () => {
    document.documentElement.classList.remove('menu-open')
    btn.setAttribute('aria-expanded', 'false')
    btn.querySelector('.menu-label')!.textContent = 'Menu'
    closeTimer = window.setTimeout(() => (menu.hidden = true), 520)
    window.dispatchEvent(new Event('sgf:unlock'))
    btn.focus()
  }
  btn.addEventListener('click', () => (btn.getAttribute('aria-expanded') === 'true' ? close() : open()))
  document.addEventListener('keydown', (e) => {
    if (menu.hidden) return
    if (e.key === 'Escape') close()
    if (e.key === 'Tab') {
      const l = [btn, ...links()]
      const i = l.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && i <= 0) { e.preventDefault(); l[l.length - 1].focus() }
      else if (!e.shiftKey && i === l.length - 1) { e.preventDefault(); l[0].focus() }
    }
  })
}
