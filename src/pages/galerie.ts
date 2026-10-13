import { bootPage } from '../core/boot'
import { pageHead, ctaBand, sampleNote } from '../core/ui'
import { gallery } from '../data/gallery'
import { vaseSVG } from '../core/art'
import { $, $$ } from '../core/dom'
import { photos, photoImg } from '../data/photos'

const lieux = ['tous', ...Array.from(new Set(gallery.map((g) => g.lieu)))]

bootPage('galerie', () => `
${pageHead({ kicker: 'Chez vous !', titre: 'Des bouquets dans vos maisons.', lede: 'Un clin d’œil au rendez-vous « Chez vous ! » de notre Instagram : un bouquet, un vase, une pièce.' })}
<section class="section wrap">
  <div class="section-head"><h2 class="h2" data-split>En photos</h2><p class="lede" data-reveal>Champs, seaux, bouquets frais et séchés : l’ambiance d’une boutique de fleurs de saison.</p></div>
  ${sampleNote('Photos d’illustration (Unsplash, licence Unsplash), pas des photos de la boutique ni de la ferme.')}
  <div class="ph-gallery">${photos.map((ph) => `<figure class="ph ph--${ph.height > ph.width * 1.1 ? 'portrait' : 'paysage'}" data-reveal="clip">${photoImg(ph)}<figcaption>${ph.alt}</figcaption></figure>`).join('')}</div>
</section>
<section class="section wrap">
  <div class="section-head"><h2 class="h2" data-split>Chez vous, dessiné</h2></div>
  ${sampleNote('Illustrations originales dessinées pour la démonstration, pas des photos de clients.')}
  <div class="filters" role="group" aria-label="Lieu">${lieux.map((l, i) => `<button class="chip" type="button" data-lieu="${l}" aria-pressed="${i === 0}">${l === 'tous' ? 'Tout voir' : l}</button>`).join('')}</div>
  <div class="masonry" id="masonry">
    ${gallery.map((g) => `<figure class="shot shot--${g.ratio}" data-lieu="${g.lieu}" data-reveal="clip"><button type="button" class="shot-hit" data-g="${g.id}" aria-label="Agrandir : ${g.legende}"></button>${vaseSVG(g.fleurs, g.vase, g.ratio, g.graine, g.lieu)}<figcaption>${g.legende}</figcaption></figure>`).join('')}
  </div>
</section>
<dialog id="dlg" aria-label="Illustration agrandie"><button class="dlg-close" type="button" aria-label="Fermer">&times;</button><div id="dlg-body" class="lightbox"></div></dialog>
${ctaBand('Envie de voir vos fleurs ici ? Commandez un bouquet.')}
`, () => {
  const dlg = $<HTMLDialogElement>('#dlg')!
  $$('[data-g]').forEach((b) => b.addEventListener('click', () => {
    const g = gallery.find((x) => x.id === b.dataset.g)!
    $('#dlg-body')!.innerHTML = `${vaseSVG(g.fleurs, g.vase, g.ratio, g.graine, g.lieu)}<p>${g.legende}</p>`
    dlg.showModal()
  }))
  $('.dlg-close', dlg)!.addEventListener('click', () => dlg.close())
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close() })
  const chips = $$('[data-lieu].chip')
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)))
    $$('.shot').forEach((s) => { s.hidden = c.dataset.lieu !== 'tous' && s.dataset.lieu !== c.dataset.lieu })
  }))
})
