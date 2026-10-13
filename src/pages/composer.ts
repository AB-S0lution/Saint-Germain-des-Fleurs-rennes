import { bootPage } from '../core/boot'
import { pageHead, ctaBand, orderMailto, photoBand } from '../core/ui'
import { photoBySlug } from '../data/photos'
import { composerStems, stemFlower, type ComposerStem } from '../data/composerStems'
import { MOIS, prochainMois } from '../data/months'
import { bouquetSVG, stemIcon } from '../core/art'
import { $, $$, euro, typo, href } from '../core/dom'
import { SITE } from '../data/site'
import { gsap } from '../core/motion'
import { moisNom, deMois } from '../core/season'

const MAX_TOTAL = 40
const MAX_PER = 12

bootPage('composer', ({ month }) => {
  const dispo = composerStems.filter((s) => stemFlower(s).mois.includes(month))
  return `
${pageHead({ kicker: 'Composer à la tige', titre: `Votre bouquet ${deMois(month)}.`, lede: `Choisissez parmi les ${dispo.length} tiges de saison. Celles qui ne sont pas de ce mois sont grisées, avec la date de leur retour.` })}
<section class="section wrap">
  <div class="composer">
    <div class="bench-wrap">
      <p class="bench-help" id="help">Touchez une tige pour l’ajouter. Avec une souris, vous pouvez aussi la glisser dans le papier kraft.</p>
      <ul class="bench" id="bench" aria-describedby="help">
        ${composerStems.map((s, i) => [s, i] as const).sort(([a], [b]) => Number(stemFlower(b).mois.includes(month)) - Number(stemFlower(a).mois.includes(month))).map(([s, i]) => {
          const f = stemFlower(s)
          const ok = f.mois.includes(month)
          return `<li><button type="button" class="stem${ok ? '' : ' is-off'}" data-id="${s.id}" ${ok ? '' : 'aria-disabled="true"'} aria-label="${ok ? `Ajouter ${f.nom}, ${euro(s.prix)} la tige` : `${f.nom} : hors saison, revient en ${MOIS[prochainMois(f.mois, month) - 1]}`}">
            <span class="stem-art">${stemIcon(f, i + 1)}</span>
            <span class="stem-n">${f.nom}</span>
            <span class="stem-p">${ok ? `${euro(s.prix)} la tige` : `revient en ${MOIS[prochainMois(f.mois, month) - 1]}`}</span>
            <span class="stem-q" aria-hidden="true"></span>
          </button></li>`
        }).join('')}
      </ul>
    </div>
    <aside class="wrapzone" aria-label="Votre bouquet">
      <div class="drop" id="drop"><div id="preview" class="preview"></div><p class="drop-empty" id="drop-empty">Déposez les tiges ici.</p></div>
      <div class="sel">
        <h2 class="h3">Votre sélection</h2>
        <ul class="sel-list" id="sel-list" aria-live="polite"></ul>
        <p class="sel-total" id="sel-total"></p>
        <p class="hint">Estimation d’exemple, sans valeur de devis. Le prix réel vous sera donné par la boutique.</p>
        <div class="sel-actions">
          <a class="btn" id="send" href="#" aria-disabled="true">Envoyer par mail</a>
          <a class="btn btn--ghost" href="${SITE.telHref}">Appeler</a>
          <button class="btn btn--ghost" type="button" id="copy">Copier le message</button>
          <button class="btn btn--ghost" type="button" id="reset">Vider</button>
        </div>
        <p class="hint" id="copied" role="status"></p>
        <p class="hint">Mois affiché : ${moisNom(month)}. Pour un autre mois, voir <a class="link" href="${href('saisons.html')}">Fleurs de saison</a>.</p>
      </div>
    </aside>
  </div>
</section>
<section class="section wrap">
  <div class="section-head"><h2 class="h2" data-split>Ce qui finit dans le papier kraft</h2><p class="lede" data-reveal>Des tiges de saison, montées en bouquet rond ou champêtre, liées au raphia.</p></div>
  ${photoBand(['boutique-pleine', 'etagere-bouquet', 'dahlias-vase'].map(photoBySlug), 'ph-band--hero')}
</section>
${ctaBand('Pas envie de composer ? On le fait pour vous.')}
`
}, ({ month, reduced }) => {
  const sel = new Map<string, number>()
  const byId = new Map<string, ComposerStem>(composerStems.map((s) => [s.id, s]))
  const preview = $('#preview')!
  let lastAdded = ''

  const message = () => {
    const lignes = [...sel].map(([id, n]) => `- ${n} × ${stemFlower(byId.get(id)!).nom.toLowerCase()}`)
    return ['Bonjour,', '', 'Je souhaiterais un bouquet avec :', ...lignes, '', `(Composé avec les tiges de saison de ${moisNom(month)}.)`, 'Retrait souhaité le : ', 'Mon prénom : ', '', 'Merci !'].join('\n')
  }
  const total = () => [...sel].reduce((a, [id, n]) => a + byId.get(id)!.prix * n, 0)
  const count = () => [...sel.values()].reduce((a, n) => a + n, 0)

  const render = (animate = true) => {
    const n = count()
    $('#drop-empty')!.hidden = n > 0
    preview.innerHTML = n ? bouquetSVG({ seed: 5, w: 320, h: 380, tiges: [...sel].map(([id, q]) => [stemFlower(byId.get(id)!).id, q] as [string, number]), newest: lastAdded }) : ''
    $$('.stem').forEach((b) => {
      const q = sel.get(b.dataset.id!) ?? 0
      b.classList.toggle('is-picked', q > 0)
      const badge = $('.stem-q', b)!
      badge.textContent = q ? `×${q}` : ''
    })
    $('#sel-list')!.innerHTML = typo([...sel].map(([id, q]) => {
      const f = stemFlower(byId.get(id)!)
      return `<li><span>${f.nom}</span><span class="qty"><button type="button" data-d="-1" data-id="${id}" aria-label="Retirer une tige de ${f.nom}">−</button><b>${q}</b><button type="button" data-d="1" data-id="${id}" aria-label="Ajouter une tige de ${f.nom}">+</button></span></li>`
    }).join('')) || '<li class="empty">Aucune tige pour l’instant.</li>'
    $('#sel-total')!.innerHTML = n ? typo(`${n} tige${n > 1 ? 's' : ''}, environ <strong>${euro(Math.round(total() * 100) / 100)}</strong>`) : ''
    const send = $<HTMLAnchorElement>('#send')!
    send.setAttribute('aria-disabled', String(!n))
    send.href = n ? orderMailto('Commande : bouquet à la tige', message()) : '#'
    if (animate && !reduced && lastAdded) {
      const heads = $$<SVGGElement>('.bq-head.is-new .bq-in', preview)
      const last = heads[heads.length - 1]
      if (last) gsap.from(last, { scale: 0.1, rotation: gsap.utils.random(-40, 40), opacity: 0, duration: 1.1, ease: 'elastic.out(1, 0.55)', transformOrigin: '0 0' })
    }
  }

  const add = (id: string, d = 1) => {
    const s = byId.get(id)
    if (!s || !stemFlower(s).mois.includes(month)) return
    const cur = sel.get(id) ?? 0
    const next = Math.max(0, Math.min(MAX_PER, cur + d))
    if (count() - cur + next > MAX_TOTAL) return
    if (next === 0) sel.delete(id); else sel.set(id, next)
    lastAdded = d > 0 ? stemFlower(s).id : ''
    render()
  }

  // Clic / toucher
  $('#bench')!.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('.stem')
    if (b && !b.classList.contains('is-dragged')) add(b.dataset.id!)
  })
  $('#sel-list')!.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-d]')
    if (b) add(b.dataset.id!, Number(b.dataset.d))
  })
  $('#reset')!.addEventListener('click', () => { sel.clear(); lastAdded = ''; render() })
  $('#copy')!.addEventListener('click', async () => {
    const out = $('#copied')!
    if (!count()) { out.textContent = 'Ajoutez d’abord quelques tiges.'; return }
    try { await navigator.clipboard.writeText(message()); out.textContent = 'Message copié. Collez-le dans un mail ou un SMS.' } catch { out.textContent = 'La copie n’est pas disponible ici : utilisez le bouton « Envoyer par mail ».' }
  })
  $('#send')!.addEventListener('click', (e) => { if (!count()) e.preventDefault() })

  // Glisser-déposer à la souris
  if (!reduced) {
    const drop = $('#drop')!
    $$<HTMLElement>('.stem:not(.is-off)').forEach((b) => {
      b.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch' || e.button !== 0) return
        const sx = e.clientX, sy = e.clientY
        let ghost: HTMLElement | null = null
        const move = (ev: PointerEvent) => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
            ghost = document.createElement('div')
            ghost.className = 'ghost'
            ghost.innerHTML = $('.stem-art', b)!.innerHTML
            document.body.append(ghost)
            b.classList.add('is-dragged')
          }
          if (ghost) {
            gsap.set(ghost, { x: ev.clientX - 40, y: ev.clientY - 75 })
            const r = drop.getBoundingClientRect()
            drop.classList.toggle('is-over', ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom)
          }
        }
        const up = (ev: PointerEvent) => {
          window.removeEventListener('pointermove', move)
          window.removeEventListener('pointerup', up)
          if (ghost) {
            const r = drop.getBoundingClientRect()
            if (ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom) add(b.dataset.id!)
            ghost.remove()
            drop.classList.remove('is-over')
            window.setTimeout(() => b.classList.remove('is-dragged'), 0)
          }
        }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
      })
    })
  }
  render(false)
})
