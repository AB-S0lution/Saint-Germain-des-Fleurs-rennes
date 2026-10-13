import { bootPage } from '../core/boot'
import { pageHead, ctaBand, monthBar, etiquette } from '../core/ui'
import { flowers, flowerById, type Couleur } from '../data/flowers'
import { MOIS, MOIS_COURTS } from '../data/months'
import { flowerHead, stemIcon } from '../core/art'
import { currentMonth, flowerOfMonth, saisonOf, SAISON_TOKENS, setMonthOverride, realMonth, applySeason, moisNom } from '../core/season'
import { $, $$, typo } from '../core/dom'
import { gsap } from '../core/motion'

const R_IN = 118
const R_OUT = 192
const dark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

function sector(i: number): string {
  const a0 = ((i - 0.5) * 30 - 90) * (Math.PI / 180)
  const a1 = ((i + 0.5) * 30 - 90) * (Math.PI / 180)
  const p = (r: number, a: number) => `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`
  return `M${p(R_IN, a0)}A${R_IN} ${R_IN} 0 0 1 ${p(R_IN, a1)}L${p(R_OUT, a1)}A${R_OUT} ${R_OUT} 0 0 0 ${p(R_OUT, a0)}Z`
}

const COULEURS: Couleur[] = ['blanc', 'rose', 'rouge', 'orange', 'jaune', 'bleu', 'violet', 'vert']

bootPage('saisons', ({ month }) => `
${pageHead({ kicker: 'Fleurs de saison', titre: 'Douze mois, douze bouquets.', lede: 'Ici, tout suit le calendrier. Faites défiler : la roue traverse l’année, et l’accent du site change avec le mois.' })}
<section class="wheel-sec" id="wheel-sec" aria-label="Roue des mois">
  <div class="wheel-pin">
    <div class="wrap wheel-in">
      <div class="wheel-box">
        <svg viewBox="-200 -200 400 400" class="wheel" aria-hidden="true" focusable="false">
          <g id="wheel-ring">
            ${MOIS_COURTS.map((_, i) => `<g class="sec" data-i="${i}"><path d="${sector(i)}" style="fill:${SAISON_TOKENS[saisonOf(i + 1)][0]}"/><g transform="rotate(${i * 30}) translate(0 -155)"><text class="sec-t" text-anchor="middle" dominant-baseline="middle" data-r="${i * 30}">${MOIS_COURTS[i]}</text></g></g>`).join('')}
          </g>
          <circle r="${R_IN - 6}" class="wheel-core"/>
          ${MOIS.map((_, i) => `<g class="bloom-m" data-i="${i}" opacity="0">${flowerHead(flowerById(flowerOfMonth(i + 1)), 92, i + 1)}</g>`).join('')}
          <path d="M-12 -206L12 -206L0 -190Z" class="wheel-pointer"/>
        </svg>
      </div>
      <div class="wheel-info" aria-live="polite">
        <p class="kicker" id="w-saison">Printemps</p>
        <h2 class="display" id="w-mois">${moisNom(month)}</h2>
        <p class="lede" id="w-vedette"></p>
        <ul class="w-flowers" id="w-flowers"></ul>
        <div class="w-actions">
          <button class="btn" type="button" id="w-set">Voir le site en <span id="w-set-m">${moisNom(month)}</span></button>
          <button class="btn btn--ghost" type="button" id="w-reset" hidden>Revenir à ${MOIS[realMonth() - 1]}</button>
        </div>
        <p class="hint" id="w-state"></p>
      </div>
    </div>
    <div class="wrap"><div class="filters months-nav" role="group" aria-label="Choisir un mois">${MOIS_COURTS.map((m, i) => `<button class="chip" type="button" data-m="${i}" aria-pressed="false">${m}</button>`).join('')}</div></div>
  </div>
</section>

<section class="section wrap">
  <div class="section-head"><h2 class="h2" data-split>L’index des fleurs</h2><p class="lede" data-reveal>Quarante variétés d’exemple. Sept sont citées par la presse comme cultivées à la ferme ; les autres sont plausibles en Bretagne mais restent à confirmer.</p></div>
  <div class="cat-tools">
    <div class="field"><label for="fq">Rechercher</label><input id="fq" type="search" placeholder="Pivoine, ammi…" autocomplete="off"></div>
    <div class="field"><label for="fm">Mois</label><select id="fm"><option value="0">Toute l’année</option>${MOIS.map((m, i) => `<option value="${i + 1}"${i + 1 === month ? ' selected' : ''}>${m}</option>`).join('')}</select></div>
    <div class="field"><label for="fc">Couleur</label><select id="fc"><option value="">Toutes</option>${COULEURS.map((c) => `<option>${c}</option>`).join('')}</select></div>
  </div>
  <p class="count" id="fcount" aria-live="polite"></p>
  <div class="grid g-4" id="findex"></div>
</section>
${ctaBand('Composez avec ce qui est ouvert ce mois-ci.')}
`, ({ month, reduced }) => {
  let shown = -1
  const sec = $('#wheel-sec')!
  const ring = $('#wheel-ring')!
  const blooms = $$<SVGGElement>('.bloom-m')
  const chips = $$('[data-m]')
  const start = month - 1

  const setMonth = (i: number) => {
    i = ((i % 12) + 12) % 12
    if (i === shown) return
    shown = i
    const m = i + 1
    const sk = saisonOf(m)
    const tok = SAISON_TOKENS[sk]
    sec.style.setProperty('--saison', tok[0])
    sec.style.setProperty('--saison-ink', dark() ? tok[2] : tok[1])
    const f = flowerById(flowerOfMonth(m))
    $('#w-mois')!.textContent = MOIS[i]
    $('#w-saison')!.textContent = { renoncule: 'Printemps, renoncule', pivoine: 'Mai et juin, pivoine', hortensia: 'Été, hortensia', dahlia: 'Automne, dahlia', ellebore: 'Hiver, ellébore' }[sk]
    $('#w-vedette')!.innerHTML = typo(`Fleur du mois : <strong>${f.nom.toLowerCase()}</strong>. ${f.note}`)
    const list = flowers.filter((x) => x.mois.includes(m) && x.kind !== 'leaf')
    $('#w-flowers')!.innerHTML = typo(list.slice(0, 10).map((x) => `<li>${x.nom}</li>`).join('') + (list.length > 10 ? `<li class="more-n">et ${list.length - 10} autres</li>` : ''))
    $('#w-set-m')!.textContent = MOIS[i]
    chips.forEach((c, k) => c.setAttribute('aria-pressed', String(k === i)))
    // rotation de la roue et fondu des fleurs
    const rot = -i * 30
    if (reduced) gsap.set(ring, { rotation: rot })
    else gsap.to(ring, { rotation: rot, duration: 0.9, ease: 'power3.out', overwrite: true })
    $$<SVGTextElement>('.sec-t', ring).forEach((t) => { if (reduced) gsap.set(t, { rotation: -(Number(t.dataset.r) + rot) }); else gsap.to(t, { rotation: -(Number(t.dataset.r) + rot), duration: 0.9, ease: 'power3.out', overwrite: true, transformOrigin: 'center' }) })
    blooms.forEach((b, k) => { if (reduced) gsap.set(b, { opacity: k === i ? 1 : 0 }); else gsap.to(b, { opacity: k === i ? 1 : 0, scale: k === i ? 1 : 0.8, rotation: k === i ? 0 : -20, duration: 0.7, ease: 'power3.out', overwrite: true, transformOrigin: '0 0' }) })
  }
  const stateText = () => {
    const over = currentMonth() !== realMonth()
    $('#w-reset')!.hidden = !over
    $('#w-state')!.textContent = over ? `Le site s’affiche en ${moisNom(currentMonth())} sur toutes les pages (choix gardé sur cet appareil).` : `Le site suit le mois réel : ${moisNom(realMonth())}.`
  }
  stateText()
  chips.forEach((c, k) => c.addEventListener('click', () => setMonth(k)))
  $('#w-set')!.addEventListener('click', () => { setMonthOverride(((shown % 12) + 12) % 12 + 1 === realMonth() ? null : shown + 1); location.reload() })
  $('#w-reset')!.addEventListener('click', () => { setMonthOverride(null); location.href = location.pathname })
  setMonth(start)
  applySeason()
  if (!reduced) {
    gsap.to({}, { scrollTrigger: { trigger: '.wheel-pin', start: 'top top', end: '+=260%', pin: true, scrub: true, anticipatePin: 1, onUpdate: (self) => setMonth(start + Math.min(11, Math.floor(self.progress * 12))) } })
  }

  // --- index des fleurs ---
  const st = { q: '', m: month, c: '' }
  const grid = $('#findex')!
  const render = () => {
    const list = flowers.filter((f) => (!st.m || f.mois.includes(st.m)) && (!st.c || f.couleur === st.c) && (!st.q || f.nom.toLowerCase().includes(st.q)))
    grid.innerHTML = typo(list.map((f, i) => `<article class="fcard"><div class="fcard-ico">${stemIcon(f, i + 1)}</div><h3 class="h3">${f.nom}</h3>${monthBar(f.mois, month)}<p class="fcard-m">${f.mois.length === 12 ? 'Toute l’année' : `${MOIS_COURTS[f.mois[0] - 1]} à ${MOIS_COURTS[f.mois[f.mois.length - 1] - 1]}`}</p><p class="hint">${f.note}</p><p>${f.citee ? etiquette('citée par la presse') : etiquette('à confirmer')}</p></article>`).join('')) || '<p class="empty">Aucune fleur pour ce filtre.</p>'
    $('#fcount')!.textContent = `${list.length} ${list.length > 1 ? 'variétés' : 'variété'}`
  }
  $<HTMLInputElement>('#fq')!.addEventListener('input', (e) => { st.q = (e.target as HTMLInputElement).value.trim().toLowerCase(); render() })
  $<HTMLSelectElement>('#fm')!.addEventListener('change', (e) => { st.m = Number((e.target as HTMLSelectElement).value); render() })
  $<HTMLSelectElement>('#fc')!.addEventListener('change', (e) => { st.c = (e.target as HTMLSelectElement).value; render() })
  render()
})
