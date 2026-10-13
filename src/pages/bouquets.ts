import { bootPage } from '../core/boot'
import { pageHead, ctaBand, bouquetCard, bouquetArt, monthBar, orderMailto, sampleNote, etiquette, photoBand } from '../core/ui'
import { photosByTheme } from '../data/photos'
import { bouquets, type Bouquet } from '../data/bouquets'
import { flowerById, type Couleur } from '../data/flowers'
import { MOIS, prochainMois } from '../data/months'
import { $, $$, euro, href, typo } from '../core/dom'
import { SITE } from '../data/site'
import { gsap } from '../core/motion'
import { moisNom } from '../core/season'

const COULEURS: Record<Couleur, string> = { blanc: '#F3F1E6', rose: '#D88A9A', rouge: '#B5362E', orange: '#E8703A', jaune: '#F1C21F', bleu: '#6C7FB0', violet: '#8A6AAE', vert: '#5E6F4E' }
const OCC: [string, string][] = [['tous', 'Toutes occasions'], ['anniversaire', 'Anniversaire'], ['fete-des-meres', 'Fête des mères'], ['naissance', 'Naissance'], ['merci', 'Merci'], ['maison', 'Pour la maison'], ['invite', 'Invitation']]
const PRIX: [string, string, number, number][] = [['tous', 'Tous les prix', 0, 999], ['p1', 'Moins de 20 €', 0, 19.99], ['p2', '20 à 30 €', 20, 30], ['p3', '30 à 45 €', 30.01, 45], ['p4', 'Plus de 45 €', 45.01, 999]]

bootPage('bouquets', ({ month }) => `
${pageHead({ kicker: 'Bouquets et créations', titre: `Ce qui est de saison en ${moisNom(month)}.`, lede: 'Un catalogue d’exemple : les bouquets changent chaque semaine, selon ce qui s’ouvre. Filtrez par couleur, occasion ou budget.' })}
<section class="section wrap">
  ${sampleNote('Catalogue, noms et prix indicatifs : exemples. Les prix réels sont à demander à la boutique.')}
  ${photoBand(photosByTheme('bouquet').slice(0, 4), 'ph-band--quad')}
  <div class="cat-tools">
    <div class="field"><label for="q">Rechercher</label><input id="q" type="search" placeholder="Dahlia, pivoine, Port-Lazo…" autocomplete="off"></div>
    <div class="field"><label for="occ">Occasion</label><select id="occ">${OCC.map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></div>
    <div class="field"><label for="etat">Frais ou séché</label><select id="etat"><option value="tous">Frais et séchés</option><option value="frais">Frais</option><option value="sec">Séchés</option></select></div>
    <div class="field"><label for="prix">Prix indicatif</label><select id="prix">${PRIX.map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></div>
  </div>
  <div class="filters" role="group" aria-label="Filtres de couleur et de saison">
    <button class="chip" type="button" id="saison" aria-pressed="true">De saison en ${moisNom(month)}</button>
    ${(Object.keys(COULEURS) as Couleur[]).map((c) => `<button class="chip chip--c" type="button" data-c="${c}" aria-pressed="false"><i style="background:${COULEURS[c]}"></i>${c}</button>`).join('')}
  </div>
  <p class="count" id="count" aria-live="polite"></p>
  <div class="grid g-3" id="grid"></div>
  <p class="empty" id="vide" hidden>Rien ne correspond à ces filtres. Retirez une couleur, ou décochez « de saison » pour voir toute l’année.</p>
</section>
<dialog id="dlg" aria-labelledby="dlg-t"><button class="dlg-close" type="button" aria-label="Fermer">&times;</button><div class="dlg-in"><div class="dlg-art" id="dlg-art"></div><div class="dlg-body" id="dlg-body"></div></div></dialog>
${ctaBand('Rien ne vous parle ? Composez votre propre bouquet.')}
`, ({ month, reduced }) => {
  const st = { q: '', occ: 'tous', etat: 'tous', prix: 'tous', saison: true, couleurs: new Set<Couleur>() }
  const grid = $('#grid')!
  const apply = () => {
    const [, , lo, hi] = PRIX.find((p) => p[0] === st.prix)!
    const list = bouquets.filter((b) => {
      if (st.saison && !b.mois.includes(month)) return false
      if (st.couleurs.size && !st.couleurs.has(b.couleur)) return false
      if (st.occ !== 'tous' && !b.occasions.includes(st.occ as Bouquet['occasions'][number])) return false
      if (st.etat !== 'tous' && b.etat !== st.etat) return false
      if (b.prix < lo || b.prix > hi) return false
      if (st.q) {
        const hay = `${b.nom} ${b.desc} ${b.fleurs.map((f) => flowerById(f).nom).join(' ')}`.toLowerCase()
        if (!hay.includes(st.q)) return false
      }
      return true
    })
    grid.innerHTML = typo(list.map((b) => bouquetCard(b, b.mois.includes(month), MOIS[prochainMois(b.mois, month) - 1])).join(''))
    $('#vide')!.hidden = list.length > 0
    $('#count')!.textContent = `${list.length} ${list.length > 1 ? 'créations' : 'création'}`
    if (!reduced) gsap.fromTo(grid.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.04, ease: 'power3.out', clearProps: 'all' })
    else gsap.set(grid.children, { clearProps: 'all' })
    $$('[data-reveal]', grid).forEach((e) => { e.style.opacity = '1'; e.style.transform = 'none'; e.style.clipPath = 'none' })
  }
  $<HTMLInputElement>('#q')!.addEventListener('input', (e) => { st.q = (e.target as HTMLInputElement).value.trim().toLowerCase(); apply() })
  $<HTMLSelectElement>('#occ')!.addEventListener('change', (e) => { st.occ = (e.target as HTMLSelectElement).value; apply() })
  $<HTMLSelectElement>('#etat')!.addEventListener('change', (e) => { st.etat = (e.target as HTMLSelectElement).value; apply() })
  $<HTMLSelectElement>('#prix')!.addEventListener('change', (e) => { st.prix = (e.target as HTMLSelectElement).value; apply() })
  const sb = $('#saison')!
  sb.addEventListener('click', () => { st.saison = !st.saison; sb.setAttribute('aria-pressed', String(st.saison)); apply() })
  $$('[data-c]').forEach((c) => c.addEventListener('click', () => {
    const k = c.dataset.c as Couleur
    if (st.couleurs.has(k)) st.couleurs.delete(k); else st.couleurs.add(k)
    c.setAttribute('aria-pressed', String(st.couleurs.has(k)))
    apply()
  }))

  const dlg = $<HTMLDialogElement>('#dlg')!
  grid.addEventListener('click', (e) => {
    const hit = (e.target as Element).closest<HTMLElement>('[data-bouquet]')
    if (!hit) return
    const b = bouquets.find((x) => x.id === hit.dataset.bouquet)!
    $('#dlg-art')!.innerHTML = bouquetArt(b)
    const noms = b.fleurs.map((f) => flowerById(f))
    $('#dlg-body')!.innerHTML = typo(`
      <p>${etiquette(b.etat === 'sec' ? 'séché' : 'frais')} ${etiquette(`taille ${b.taille}`)}</p>
      <h2 class="h2" id="dlg-t">${b.nom}</h2>
      <p>${b.desc}</p>
      <ul class="plain">${noms.map((f) => `<li><span>${f.nom}</span><span class="vase">${monthBar(f.mois, month)}</span></li>`).join('')}</ul>
      <p class="price">dès ${euro(b.prix)} <small>indicatif, exemple</small></p>
      <div class="dlg-actions">
        <a class="btn" href="${orderMailto(`Commande : ${b.nom}`, `Bonjour,\n\nJe souhaiterais commander le bouquet « ${b.nom} » (${noms.map((f) => f.nom.toLowerCase()).join(', ')}).\n\nRetrait souhaité le : \nMerci !`)}">Commander par mail</a>
        <a class="btn btn--ghost" href="${SITE.telHref}">Appeler</a>
        <a class="link" href="${href('composer.html')}">Composer le mien</a>
      </div>`)
    dlg.showModal()
  })
  $('.dlg-close', dlg)!.addEventListener('click', () => dlg.close())
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close() })
  apply()
})
